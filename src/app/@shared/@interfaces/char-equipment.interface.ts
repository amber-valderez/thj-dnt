import { ItemDto } from "./item-dto.interface";

export interface CharacterEquipment {
    Neck?: ItemDto;
    Head?: ItemDto;
    Face?: ItemDto;
    Chest?: ItemDto;
    Shoulders?: ItemDto;
    Back?: ItemDto;
    Waist?: ItemDto;
    Arms?: ItemDto;
    Wrists?: [ItemDto?, ItemDto?];
    Hands?: ItemDto;
    Feet?: ItemDto;
    Legs?: ItemDto;
    Primary?: ItemDto;
    Secondary?: ItemDto;
    Range?: ItemDto;
    Ammo?: ItemDto;
    Charm?: ItemDto;
    Fingers?: [ItemDto?, ItemDto?];
    Ears?: [ItemDto?, ItemDto?];
  }
  