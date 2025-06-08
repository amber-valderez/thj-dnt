import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemQuality } from '@enums/item-quality.enum';
import { BankEntry } from '@models/bank-entry.type';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'item-display',
    templateUrl: './item-display.component.html',
    styleUrls: ['./item-display.component.scss'],
    imports: [CommonModule],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDisplayComponent {
    @Input() item?: BankEntry

    ItemQuality = ItemQuality
    private _totalCount: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
    public totalCount$ = this._totalCount.asObservable();
    constructor() {}

    ngOnInit() {
        this._updateTotalCount();
    }

    ngOnChanges() {
        this._updateTotalCount();
    }

    private _updateTotalCount() {
        this._totalCount.next(
            (this.item?.baseCount ?? 0) + (this.item?.enchantedCount ?? 0) + (this.item?.legendaryCount ?? 0)
        );
    }
}
