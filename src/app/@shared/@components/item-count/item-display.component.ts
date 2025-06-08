import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ItemQuality } from '@enums/item-quality.enum';
import { BankEntry } from '@models/bank-entry.type';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'item-display',
    templateUrl: './item-display.component.html',
    styleUrls: ['./item-display.component.scss'],
    imports: [CommonModule],
    standalone: true,
})
export class ItemDisplayComponent {
    @Input() item?: BankEntry

    ItemQuality = ItemQuality
    constructor() {}
}
