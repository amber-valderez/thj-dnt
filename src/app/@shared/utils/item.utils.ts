import { ItemDto } from "../@interfaces/item-dto.interface";

export function mapAbbreviatedItem(raw: any): ItemDto {
    return {
      Id: raw.Id,
      Name: raw.Name,
      Class: raw.Class,
      Skill: raw.Skill,
      Slots: raw.Slots,
      Size: raw.Size,
      Weight: raw.W,
  
      // Pools
      HP: raw.HP,
      Mana: raw.MP,
      Endurance: raw.End,
  
      // Derived / Combat Stats
      AC: raw.AC,
      BaseDamage: raw.BDmg,
      Delay: raw.Delay,
      Attack: raw.Atk,
      Haste: raw.Haste,
      HPRegen: raw.HPRe,
      ManaRegen: raw.MPRe,
      EndRegen: raw.EndRe,
  
      // Modifiers
      HealAmount: raw.HealAmount,
      SpellDamage: raw.SpellDamage,
      Clairvoyance: raw.Clairvoyance,
      Accuracy: raw.Accuracy,
      Avoidance: raw.Avoidance,
      CombatEffects: raw.CombatEffects,
      Shielding: raw.Shielding,
      SpellShield: raw.SpellShield,
      DoTShield: raw.DoTShield,
      Strikethrough: raw.Strikethrough,
      StunResist: raw.StunResist,
      DmgShieldMitigation: raw.DmgShieldMitigation,
      DamageShield: raw.DamageShield,
  
      // Base Stats
      Strength: raw.STR,
      Stamina: raw.STA,
      Dexterity: raw.DEX,
      Agility: raw.AGI,
      Intelligence: raw.INT,
      Wisdom: raw.WIS,
      Charisma: raw.CHA,
  
      // Heroic Stats
      HeroicStrength: raw.HSTR,
      HeroicStamina: raw.HSTA,
      HeroicDexterity: raw.HDEX,
      HeroicAgility: raw.HAGI,
      HeroicIntelligence: raw.HINT,
      HeroicWisdom: raw.HWIS,
      HeroicCharisma: raw.HCHA,
  
      // Resists
      MagicResist: raw.MR,
      FireResist: raw.FR,
      ColdResist: raw.CR,
      DiseaseResist: raw.DR,
      PoisonResist: raw.PR,
  
      // Heroic Resists
      HeroicMagicResist: raw.HMR,
      HeroicFireResist: raw.HFR,
      HeroicColdResist: raw.HCR,
      HeroicDiseaseResist: raw.HDR,
      HeroicPoisonResist: raw.HPR,
  
      // Effects / Procs
      Effect: raw.Effect ?? null,
      FocusEffect: raw.FE ?? null,
      ClickEffect: raw.CE ?? null,
      ClickCastingTime: raw.CCT ?? null,
      ProcEffect: raw.PE ?? null,
      ClickEffectType: raw.CET ?? null,
      BardSkill: raw.BS ?? null,
      ProcRateModifier: raw.PRM ?? null,
  
      AugmentSlots: raw.Augs ?? [],
      DropSources: raw.Drops ?? [],
    };
  }
  