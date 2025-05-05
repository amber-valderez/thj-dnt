import { Component, Input } from '@angular/core';
import { ItemDto } from '../../@shared/@interfaces/item-dto.interface';
import { CommonModule } from '@angular/common';
import { AugmentSlotType } from '../../@shared/@enums/augment-slot.enum';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.scss'],
    imports: [CommonModule],
})
export class ItemCardComponent {
    public AugmentSlotType = AugmentSlotType;
    @Input() item!: ItemDto;
    @Input() isSimpleMode: boolean = true;
}
