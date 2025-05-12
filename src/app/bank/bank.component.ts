import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { outputFileToJson } from '../@shared/utils';
import { BankEntry } from '../@shared/@models/bank-entry.type';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlayerClass } from '../@shared/@enums/player-class.enum';
import { itemIdToPlayerClassMap } from '../@shared/epic-utils';
import { spellIdToPlayerClassMap } from '../@shared/spell-utils';
import { BankCategory, getCategory } from '../@shared/@enums/bank-category.enum';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { ItemSlot } from '../@shared/@enums/item-slot.enum';
import { getDisplayDeltaFromDate } from '../@shared/utils/date-utils';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'ariza-bank',
    imports: [
        CommonModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './bank.component.html',
    styleUrl: './bank.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankComponent {
    private _searchText$ = new BehaviorSubject<string>('');
    private searchSubscription: Subscription | undefined;
    onSearchChange($event: Event) {
        const input = $event.target as HTMLInputElement;
        const value = input.value;
        this._searchText$.next(value);
    }

    private firestore = inject(Firestore);
    private item$: Observable<any[]>;

    //#region Bank Data
    private _bankData$: BehaviorSubject<Map<BankCategory, BankEntry[]>> = new BehaviorSubject<Map<BankCategory, BankEntry[]>>(
        new Map<BankCategory, BankEntry[]>()
    );
    public bankData$: Observable<Map<BankCategory, BankEntry[]>> = this._bankData$.asObservable();
    //#endregion

    //#region lastModified
    private lastModifiedSubscription: Subscription;

    // Tracks the last modified date of the uploaded files
    private lastModified: Date | null = null;
    private readonly _lastModifiedDisplay$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public lastModifiedDisplay$: Observable<string> = this._lastModifiedDisplay$.asObservable();
    //#endregion

    /**
     * Enums for reference in the template
     */
    //#region Enums
    public BankCategory = BankCategory;
    public PlayerClass = PlayerClass;
    public ItemSlot = ItemSlot;
    //#endregion

    public Object = Object;
    private _itemSlots$: BehaviorSubject<ItemSlot[]> = new BehaviorSubject<ItemSlot[]>([]);
    public itemSlots$: Observable<ItemSlot[]> = this._itemSlots$.asObservable();

    public _classesMap$: BehaviorSubject<Map<BankCategory, PlayerClass[]>> = new BehaviorSubject<Map<BankCategory, PlayerClass[]>>(
        new Map<BankCategory, PlayerClass[]>()
    );
    public classesMap$: Observable<Map<BankCategory, PlayerClass[]>> = this._classesMap$.asObservable();

    private _playerClasses: PlayerClass[] = Object.values(PlayerClass).filter((value) => typeof value === 'string') as PlayerClass[];

    public getClasses(category: BankCategory): PlayerClass[] {
        let playerClasses = this._playerClasses;
        if (category !== BankCategory.Epics) {
            playerClasses = playerClasses.filter(
                (playerClass) => !['Berserker', 'Monk', 'Rogue', 'Warrior'].includes(playerClass)
            ) as PlayerClass[];
        }

        return playerClasses;
    }

    private _itemSlotBankEntryMap$ = new BehaviorSubject<Map<ItemSlot, BankEntry[]>>(new Map<ItemSlot, BankEntry[]>());
    public itemSlotBankEntryMap$ = this._itemSlotBankEntryMap$.asObservable();

    constructor() {
        const itemCollection = collection(this.firestore, 'items');
        this.item$ = collectionData(itemCollection);

        this.lastModifiedSubscription = interval(1000).subscribe(() => {
            if (this.lastModified) {
                const displayDeltaFromDate = getDisplayDeltaFromDate(this.lastModified);
                this._lastModifiedDisplay$.next(displayDeltaFromDate);
            }
        });
    }

    private resetValues = () => {
        this._itemSlots$.next((Object.values(ItemSlot).filter((value) => typeof value === 'number') as ItemSlot[]).sort((a, b) =>
            ItemSlot[a].localeCompare(ItemSlot[b])));
        this._classCategoryDataToBankEntryMap = new Map<BankCategory, Map<PlayerClass | ItemSlot, Array<BankEntry>>>();
    };
    ngOnDestroy(): void {
        if (this.lastModifiedSubscription) {
            this.lastModifiedSubscription.unsubscribe();
        }
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        // Existing initialization code
        console.log('BankComponent initialized');

        // Initialize our classMap
        this._classesMap$.next(
            new Map<BankCategory, PlayerClass[]>([
                [BankCategory.Epics, this.getClasses(BankCategory.Epics)],
                [BankCategory.Items, this.getClasses(BankCategory.Items)],
                [BankCategory.Spells, this.getClasses(BankCategory.Spells)],
            ])
        );

        // Initialize our bankData$
        this.initializeBankData();

        this.searchSubscription = this._searchText$
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap((searchTerm) => {
                    this.resetValues();
                    this.initializeBankData(searchTerm);
                    return this.bankData$;
                })
            )
            .subscribe(() => {});
    }

    public initializeBankData(filter: string | null = null): void {
        // Initialize our bankData$
        let hasProcessedSharedBank = false;
        this.item$.subscribe((rawData) => {
            this._classCategoryDataToBankEntryMap.clear();
            const bankData = new Map<BankCategory, BankEntry[]>();

            rawData.forEach((itemPayload) => {
                const name = itemPayload.name;
                const data = itemPayload.data;
                const rawDate = itemPayload.date;
                const date = rawDate ? new Date(rawDate) : null;
                if (date && (!this.lastModified || this.lastModified < date)) {
                    this.lastModified = date;
                }
                // Remove the first 3 characters (dnt)
                // Split on -, get the first index ('bank' vs 'craft')
                const category = name.substring(3).split('-')[0];
                const processedData: BankEntry[] = outputFileToJson(data, filter, hasProcessedSharedBank).sort((a, b) => a.name.localeCompare(b.name));
                hasProcessedSharedBank = true;
                const categoryEnum = getCategory(category);
                this._processData(processedData, categoryEnum);
                bankData.set(categoryEnum, processedData);
            });
            this._bankData$.next(bankData);
        });
    }

    private _classCategoryDataToBankEntryMap$: BehaviorSubject<Map<BankCategory, Map<PlayerClass | ItemSlot, Array<BankEntry>>>> =
        new BehaviorSubject<Map<BankCategory, Map<PlayerClass | ItemSlot, Array<BankEntry>>>>(
            new Map<BankCategory, Map<PlayerClass | ItemSlot, Array<BankEntry>>>()
        );

    public classCategoryDataToBankEntryMap$ = this._classCategoryDataToBankEntryMap$.asObservable();

    // TODO: Remove this and use Observables instead
    private _classCategoryDataToBankEntryMap: Map<BankCategory, Map<PlayerClass | ItemSlot, Array<BankEntry>>> = new Map<
        BankCategory,
        Map<PlayerClass | ItemSlot, Array<BankEntry>>
    >();
    private _get_classCategoryDataToBankEntryMap(category: BankCategory): Map<PlayerClass | ItemSlot, Array<BankEntry>> {
        if (!this._classCategoryDataToBankEntryMap.has(category)) {
            this._classCategoryDataToBankEntryMap.set(category, new Map<PlayerClass, Array<BankEntry>>());
        }
        return this._classCategoryDataToBankEntryMap.get(category)!;
    }

    private _processData(processedData: BankEntry[], category: BankCategory = BankCategory.Epics): void {
        // Special post processing for Epics and Spells
        if ([BankCategory.Epics, BankCategory.Spells].includes(category)) {
            // classDataToBankEntryMap
            const map: Map<PlayerClass | ItemSlot, Array<BankEntry>> = this._get_classCategoryDataToBankEntryMap(category);

            const classMappedData = category === BankCategory.Epics ? itemIdToPlayerClassMap() : spellIdToPlayerClassMap();
            processedData.forEach((bankEntry) => {
                const playerClasses = classMappedData.get(bankEntry.id) || classMappedData.get(bankEntry.baseId) || [PlayerClass.Unknown];
                playerClasses.forEach((playerClass) => {
                    if (map.has(playerClass)) {
                        const existingEntries = map.get(playerClass)!;
                        const existingEntry = existingEntries.find((existingEntry) => existingEntry.id === bankEntry.id);
                        if (existingEntry) {
                            existingEntry.count += bankEntry.count;
                        } else {
                            existingEntries.push(bankEntry);
                        }
                    } else {
                        map.set(playerClass, [bankEntry]);
                    }
                });
            });

            this._classCategoryDataToBankEntryMap$.next(this._classCategoryDataToBankEntryMap);
        } else if (category === BankCategory.Items) {
            const _itemSlots = Object.values(ItemSlot).filter((value) => typeof value === 'number') as ItemSlot[];

            const itemSlotBankEntryMap: Map<ItemSlot, BankEntry[]> = new Map<ItemSlot, BankEntry[]>(
                _itemSlots.map((slot) => [slot, processedData.filter((item) => (slot === 0 && item.itemSlot === 0) || (item.itemSlot & slot) !== 0)])
            );

            this._itemSlots$.next(this._itemSlots$.value.filter((slot) => itemSlotBankEntryMap.get(slot)?.length));

            this._itemSlotBankEntryMap$.next(itemSlotBankEntryMap);

            const map: Map<PlayerClass | ItemSlot, Array<BankEntry>> = this._get_classCategoryDataToBankEntryMap(category);
            processedData.forEach((bankEntry) => {
                const itemSlot = bankEntry.itemSlot;
                if (map.has(itemSlot)) {
                    const existingEntries: BankEntry[] = map.get(itemSlot)!;
                    const existingEntry = existingEntries.find((existingEntry) => existingEntry.id === bankEntry.id);
                    if (existingEntry) {
                        existingEntry.count += bankEntry.count;
                    } else {
                        existingEntries.push(bankEntry);
                    }
                } else {
                    map.set(itemSlot, [bankEntry]);
                }
            });
            this._classCategoryDataToBankEntryMap$.next(this._classCategoryDataToBankEntryMap);
        }
    }
}
