import { AugmentSlot } from "./augment-slot.interface";
import { ItemDropSource } from "./item-drop-source.interface";
export interface ItemDto {
    Id: number;
    Name: string;
  
    Class: string; // change to enum if needed
    Skill?: string;
    Slots: string;
    Size?: string;
    Weight?: number;
  
    // Pools
    HP: number;
    Mana: number;
    Endurance: number;
  
    // Derived / Combat Stats
    AC: number;
    BaseDamage: number;
    Delay: number;
    Attack: number;
    Haste: number;
    HPRegen: number;
    ManaRegen: number;
    EndRegen: number;
  
    // Modifiers
    HealAmount: number;
    SpellDamage: number;
    Clairvoyance: number;
    Accuracy: number;
    Avoidance: number;
    CombatEffects: number;
    Shielding: number;
    SpellShield: number;
    DoTShield: number;
    Strikethrough: number;
    StunResist: number;
    DmgShieldMitigation: number;
    DamageShield: number;
  
    // Base Stats
    Strength: number;
    Stamina: number;
    Dexterity: number;
    Agility: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
  
    // Heroic Stats
    HeroicStrength: number;
    HeroicStamina: number;
    HeroicDexterity: number;
    HeroicAgility: number;
    HeroicIntelligence: number;
    HeroicWisdom: number;
    HeroicCharisma: number;
  
    // Resists
    MagicResist: number;
    FireResist: number;
    ColdResist: number;
    DiseaseResist: number;
    PoisonResist: number;
  
    // Heroic Resists
    HeroicMagicResist: number;
    HeroicFireResist: number;
    HeroicColdResist: number;
    HeroicDiseaseResist: number;
    HeroicPoisonResist: number;
  
    // Effects / Procs
    Effect?: string | null;
    FocusEffect?: string | null;
    ClickEffect?: string | null;
    ClickCastingTime?: string | null;
    ProcEffect?: string | null;
    ClickEffectType?: string | null;
    BardSkill?: string | null;
    ProcRateModifier?: number | null;

    AugmentSlots: AugmentSlot[];
    DropSources: ItemDropSource[];
  }