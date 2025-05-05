import { AugmentSlotType } from '../@enums/augment-slot.enum';
import { ItemDto } from './item-dto.interface';

export interface AugmentSlot {
    SlotNumber: number;
    SlotType: AugmentSlotType;
    Item?: ItemDto; // Used for assignment
}
