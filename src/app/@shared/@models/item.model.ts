import { AugmentSlot } from "../@interfaces/augment-slot.interface";
import { ItemDropSource } from "../@interfaces/item-drop-source.interface";

export class Item {
    Id: number;
    Name: string;
    Class: string;
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
  
    constructor(raw: any) {
      this.Id = raw.Id;
      this.Name = raw.Name;
      this.Class = raw.Class;
      this.Skill = raw.Skill;
      this.Slots = raw.Slots;
      this.Size = raw.Size;
      this.Weight = raw.W;
  
      this.HP = raw.HP;
      this.Mana = raw.MP;
      this.Endurance = raw.End;
  
      this.AC = raw.AC;
      this.BaseDamage = raw.BDmg;
      this.Delay = raw.Delay;
      this.Attack = raw.Atk;
      this.Haste = raw.Haste;
      this.HPRegen = raw.HPRe;
      this.ManaRegen = raw.MPRe;
      this.EndRegen = raw.EndRe;
  
      this.HealAmount = raw.HealAmount;
      this.SpellDamage = raw.SpellDamage;
      this.Clairvoyance = raw.Clairvoyance;
      this.Accuracy = raw.Accuracy;
      this.Avoidance = raw.Avoidance;
      this.CombatEffects = raw.CombatEffects;
      this.Shielding = raw.Shielding;
      this.SpellShield = raw.SpellShield;
      this.DoTShield = raw.DoTShield;
      this.Strikethrough = raw.Strikethrough;
      this.StunResist = raw.StunResist;
      this.DmgShieldMitigation = raw.DmgShieldMitigation;
      this.DamageShield = raw.DamageShield;
  
      this.Strength = raw.STR;
      this.Stamina = raw.STA;
      this.Dexterity = raw.DEX;
      this.Agility = raw.AGI;
      this.Intelligence = raw.INT;
      this.Wisdom = raw.WIS;
      this.Charisma = raw.CHA;
  
      this.HeroicStrength = raw.HSTR;
      this.HeroicStamina = raw.HSTA;
      this.HeroicDexterity = raw.HDEX;
      this.HeroicAgility = raw.HAGI;
      this.HeroicIntelligence = raw.HINT;
      this.HeroicWisdom = raw.HWIS;
      this.HeroicCharisma = raw.HCHA;
  
      this.MagicResist = raw.MR;
      this.FireResist = raw.FR;
      this.ColdResist = raw.CR;
      this.DiseaseResist = raw.DR;
      this.PoisonResist = raw.PR;
  
      this.HeroicMagicResist = raw.HMR;
      this.HeroicFireResist = raw.HFR;
      this.HeroicColdResist = raw.HCR;
      this.HeroicDiseaseResist = raw.HDR;
      this.HeroicPoisonResist = raw.HPR;
  
      this.Effect = raw.Effect ?? null;
      this.FocusEffect = raw.FE ?? null;
      this.ClickEffect = raw.CE ?? null;
      this.ClickCastingTime = raw.CCT ?? null;
      this.ProcEffect = raw.PE ?? null;
      this.ClickEffectType = raw.CET ?? null;
      this.BardSkill = raw.BS ?? null;
      this.ProcRateModifier = raw.PRM ?? null;
  
      this.AugmentSlots = raw.Augs ?? [];
      this.DropSources = raw.Drops ?? [];
    }
  }
  