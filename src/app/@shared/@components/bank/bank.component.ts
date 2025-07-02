import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { BankEntry } from '@models/bank-entry.type';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, interval, Observable, Subscription, from, combineLatest } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators';
import { getDisplayDeltaFromDate, itemIdToPlayerClassMap, spellIdToPlayerClassMap, outputFileToJson, augSources} from '@utils/index';
import { BankCategory, getCategory, ItemSlot, PlayerClass, AugSource, getBaseItemId } from '@enums/index';
import { ItemIdsByClass } from '@interfaces/itemIds-by-class.interface';
import { ItemDisplayComponent } from '../item-count/item-display.component';

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
        MatButtonModule,
        ItemDisplayComponent,
        MatProgressSpinnerModule,
    ],
    templateUrl: './bank.component.html',
    styleUrl: './bank.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankComponent {
    private _searchText$ = new BehaviorSubject<string | undefined>(undefined);
    private searchSubscription: Subscription | undefined;
    private _filterableBankCategories: BankCategory[] = [BankCategory.Items];
    private _itemIdsByClass: ItemIdsByClass = {
        Bard: [],
        Beastlord: [],
        Berserker: [],
        Cleric: [],
        Druid: [],
        Enchanter: [],
        Magician: [],
        Monk: [],
        Necromancer: [],
        Paladin: [],
        Ranger: [],
        Rogue: [],
        Shadowknight: [],
        Shaman: [],
        Warrior: [],
        Wizard: [],
        All: []
    };

    onSearchChange($event: Event) {
        const input = $event.target as HTMLInputElement;
        const inputValue = input.value.trim();
        const value = inputValue.length > 0 ? inputValue : undefined;
        this._searchText$.next(value);
    }

    onTabChange(index: number): void {
        const bankData = this._bankData$.value;
        const keys = Array.from(bankData.keys());
        this.selectedTabKey = keys[index];
    }

    showClassFilter(): boolean {
        return !!this.selectedTabKey && this._filterableBankCategories.includes(this.selectedTabKey);
    }

    @Input() items: Observable<any[]> = new Observable<any[]>();

    public selectedTabKey: BankCategory | undefined;

    //#region Class Filter
    private _selectedClasses$ = new BehaviorSubject<Set<PlayerClass>>(new Set());
    public selectedClasses$ = this._selectedClasses$.asObservable();

    private _allPlayerClasses = Object.values(PlayerClass);

    public availableFilterableClasses: PlayerClass[] = [...this._allPlayerClasses].filter((ac) => ac !== PlayerClass.Unknown);

    public toggleClass(playerClass: PlayerClass): void {
        const currentSelection = new Set(this._selectedClasses$.value);

        // Toggle the specific class
        currentSelection.has(playerClass) ? currentSelection.delete(playerClass) : currentSelection.add(playerClass);

        this._selectedClasses$.next(currentSelection);

        // Re-initialize bank data with current search term and class filter
        this.resetValues();
        this.initializeBankData(this._searchText$.value);
    }

    public isClassSelected(playerClass: PlayerClass): boolean {
        return this._selectedClasses$.value.has(playerClass);
    }

    public resetClassFilter(): void {
        this._selectedClasses$.next(new Set<PlayerClass>());
        this.resetValues();
        this.initializeBankData(this._searchText$.value);
    }

    private shouldIncludeItem(itemId: number, bankCategory: BankCategory): boolean {
        if (!this._filterableBankCategories.includes(bankCategory)) {
            return true;
        }
        const selectedClasses = this._selectedClasses$.value;
        let shouldInclude = false;
        if (!selectedClasses.size) {
            shouldInclude = true;
        } else if (this._itemIdsByClass['All']?.includes(itemId)) {
            shouldInclude = true;
        } else {
            for (const className of selectedClasses) {
                const classKey = className as keyof ItemIdsByClass;
                if (this._itemIdsByClass[classKey]?.includes(itemId)) {
                    shouldInclude = true;
                    break;
                }
            }
        }
        return shouldInclude;
    }
    //#endregion

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
    public AugSource = AugSource;
    //#endregion

    public Object = Object;
    private _itemSlots$: BehaviorSubject<ItemSlot[]> = new BehaviorSubject<ItemSlot[]>([]);
    public itemSlots$: Observable<ItemSlot[]> = this._itemSlots$.asObservable();

    public _classesMap$: BehaviorSubject<Map<BankCategory, PlayerClass[]>> = new BehaviorSubject<Map<BankCategory, PlayerClass[]>>(
        new Map<BankCategory, PlayerClass[]>()
    );
    public classesMap$: Observable<Map<BankCategory, PlayerClass[]>> = this._classesMap$.asObservable();

    private _playerClasses: PlayerClass[] = Object.values(PlayerClass).filter((value) => typeof value === 'string') as PlayerClass[];
    
    // Aug Source related properties
    public _augSourceMap$: BehaviorSubject<Map<BankCategory, AugSource[]>> = new BehaviorSubject<Map<BankCategory, AugSource[]>>(
        new Map<BankCategory, AugSource[]>()
    );
    public augSourceMap$: Observable<Map<BankCategory, AugSource[]>> = this._augSourceMap$.asObservable(); 
    private _augSources$: BehaviorSubject<AugSource[]> = new BehaviorSubject<AugSource[]>([]);
    public augSources$: Observable<AugSource[]> = this._augSources$.asObservable();
    private _augSourceBankEntryMap$ = new BehaviorSubject<Map<AugSource, BankEntry[]>>(new Map<AugSource, BankEntry[]>());
    public augSourceBankEntryMap$ = this._augSourceBankEntryMap$.asObservable();

    // Add this computed observable for easier template binding
    public augSourceItems$ = combineLatest([
        this.augSources$,
        this.augSourceBankEntryMap$
    ]).pipe(
        map(([sources, sourceMap]) => 
            sources.map(source => ({
                source,
                items: sourceMap.get(source) || []
            }))
        )
    );

    private getAugSourceFromItem(item: BankEntry): AugSource {
    const itemId = item.id;
//const itemId = item.id.toString();
  
    for (const mapping of augSources.sourceMappings) {
        if (mapping.ids.includes(getBaseItemId(itemId))) {
            return mapping.source;
        }
    }

    return AugSource.Other;
}

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
        this.lastModifiedSubscription = interval(1000).subscribe(() => {
            if (this.lastModified) {
                const displayDeltaFromDate = getDisplayDeltaFromDate(this.lastModified);
                this._lastModifiedDisplay$.next(displayDeltaFromDate);
            }
        });
    }

    private resetValues = () => {
        this._itemSlots$.next(
            (Object.values(ItemSlot).filter((value) => typeof value === 'number') as ItemSlot[]).sort((a, b) =>
                ItemSlot[a].localeCompare(ItemSlot[b])
            )
        );

        this._augSources$.next(Object.values(AugSource));
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

    private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isLoading$ = this._isLoading$.asObservable();

    ngOnInit(): void {
        // Existing initialization code
        console.log('BankComponent initialized');

        from(import('@assets/item-ids-by-class.json'))
            .subscribe(json => this._itemIdsByClass = json);

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
                    console.log('Search term changed:', searchTerm);
                    this.resetValues();
                    this.initializeBankData(searchTerm);
                    return this.bankData$;
                })
            )
            .subscribe(() => {});
    }

    public initializeBankData(filter: string | undefined = undefined): void {
    // Initialize our bankData$
    let hasProcessedSharedBank = false;
    this.items
        .pipe(
            take(1),
            tap(() => {
                this._isLoading$.next(false);
            })
        )
        .subscribe((rawData) => {
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
                const categoryEnum = getCategory(category);
                
                // Only include shared bank for specific categories (NOT Augs)
                const shouldIncludeSharedBank = ![BankCategory.Augs, BankCategory.Spells, BankCategory.Craft, BankCategory.Epics].includes(categoryEnum);
                
                const processedData: BankEntry[] = outputFileToJson(
                    data, 
                    filter, 
                    hasProcessedSharedBank || !shouldIncludeSharedBank
                )
                    .filter((item) => this.shouldIncludeItem(getBaseItemId(item.id), categoryEnum))
                    .sort((a, b) => a.name.localeCompare(b.name));
                
                // Only set the flag if we actually processed shared bank items for this category
                if (shouldIncludeSharedBank) {
                    hasProcessedSharedBank = true;
                }
                
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
                            existingEntry.baseCount += bankEntry.baseCount;
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
                _itemSlots.map((slot) => [
                    slot,
                    processedData.filter((item) => (slot === 0 && item.itemSlot === 0) || (item.itemSlot & slot) !== 0),
                ])
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
                        existingEntry.baseCount += bankEntry.baseCount;
                    } else {
                        existingEntries.push(bankEntry);
                    }
                } else {
                    map.set(itemSlot, [bankEntry]);
                }
            });
            this._classCategoryDataToBankEntryMap$.next(this._classCategoryDataToBankEntryMap);
        
        } else if (category === BankCategory.Augs) {

            const augSources = Object.values(AugSource);           
            const augSourceBankEntryMap: Map<AugSource, BankEntry[]> = new Map<AugSource, BankEntry[]>();
            
            augSources.forEach(source => {
                augSourceBankEntryMap.set(source, []);
            });
            
            processedData.forEach((bankEntry) => {
                const augSource = this.getAugSourceFromItem(bankEntry);
                const existingEntries = augSourceBankEntryMap.get(augSource) || [];
                const existingEntry = existingEntries.find((existingEntry) => existingEntry.id === bankEntry.id);

                if (existingEntry) {
                    existingEntry.baseCount += bankEntry.baseCount;
                } else {
                    existingEntries.push(bankEntry);
                }

                augSourceBankEntryMap.set(augSource, existingEntries);
            });

            // Filter out empty sources and update observables
            const filteredSources = augSources.filter(source =>
                augSourceBankEntryMap.get(source)?.length! > 0
            );

            this._augSources$.next(filteredSources);
            this._augSourceBankEntryMap$.next(augSourceBankEntryMap);
            
        }
    }
    
    trackByTabKey(index: number, tab: { key: any; value: any }): any {
        return tab.key;
    }
}
