import { NPCDrop } from "./npc-drop.interface";
import { Zone } from "./zone.interface";

export interface ItemDropSource {
    Zone: Zone;
    NPCs: NPCDrop[];
  }