import { AugSource } from "@enums/aug-source.enum";
// Base Augment Ids to determine aug source
export const everQuestAugIds = [
51889,   //  Ball of Primeval Lava
51903,   //  Compressed Froglok Bile
51907,   //  Froglok Egg Capsule
51904,   //  Singed Goblin Eye

];
export const kunarkAugIds = [
46180,   //  Blackened Lava Rock
51906,   //  Decomposing Scroll of Lore
51908,   //  Enchanted Werebone
51891,   //  Pilgrim's Protector
46181,   //  Suspended Wurm Blood

];
export const veliousAugIds = [
51919,   //  Frozen Kodiak Claw
51905,   //  Regurgitated Crystals

];
export const luclinAugIds = [
51910,   //  Snakeskin Gem

];
export const planesAugIds = [
51912,   //  Diaku Armor Fragment
51911,   //  Frozen Ball Lightning
51923,   //  Lump of Pus

];
export const bazaarAugIds = [
51716,   //  Dioptase Gem
51721,   //  Erythrite Gem
51726,   //  Wulfenite Gem
51731,   //  Anatase Gem

];
export const tradeskillAugIds = [
17730,   //  Prismatic Scale of the Elements

];
export const ykeshaAugIds = [
51892,   //  Brigand's Sunken Treasure
51909,   //  Rune of Abominable Rituals

];
export const veeshanAugIds = [
41006,   //  Flawless Green Shard of Might
41013,   //  Flawless Purple Gem of Deftness
41020,   //  Flawless Blue Jewel of Nimbleness
41027,   //  Flawless Yellow Sphere of Fortitude
41034,   //  Flawless Gray Gemstone of Knowledge
41041,   //  Flawless Turquoise Fragment of Intellect
41048,   //  Flawless Teal Crystal of Enticement
41055,   //  Pristine Pearl of Magical Warding
41062,   //  Pristine Ruby of Fiery Warding
41069,   //  Pristine Diamond of Chilling Protection
41076,   //  Pristine Opal of Illness Warding
41083,   //  Pristine Emerald of Poison Protection
41090,   //  Pristine Garnet of Constitution
41096,   //  Pristine Sapphire of Insight
41102,   //  Pristine Garnet of Constitution
41108,   //  Pristine Sapphire of Insight
69455,   //  Smooth Gemstone of Tranquility
69456,   //  Enchanted Orb of Replenishment
69457,   //  Polished Chunk of Rage
69458,   //  Enchanted Orb of Burning Spikes
69459,   //  Gemstone of Enhanced Health
69460,   //  Orb of Gathered Power
69461,   //  Bloodstone of Armored Protection

];
export const seruAugIds = [
9536,   //  Runic Fragment of Truth
9537,   //  Akhevan Fragment of Truth
9538,   //  Ssraeshzian Fragment of Truth
9539,   //  Yttrium Fragment of Truth
9540,   //  Lethal Fragment of Truth
9541,   //  Magical Fragment of Truth
9542,   //  Fiery Fragment of Truth
9543,   //  Icy Fragment of Truth
9544,   //  Healing Fragment of Truth
9545,   //  Hastened Fragment of Truth
9547,   //  Gelid Fragment of Truth
9548,   //  Replenishing Fragment of Truth

];
export const sleeperAugIds = [
1801,   //  Prismatic Scale of Cleaving
1802,   //  Prismatic Scale of Ferocity
9600,   //  Prismatic Scale of Sharpshooting
9601,   //  Prismatic Scale of Blocking
9602,   //  Prismatic Scale of Dodging
9603,   //  Prismatic Scale of Magic
9604,   //  Prismatic Scale of Affliction
9605,   //  Prismatic Scale of Enhancement
9606,   //  Prismatic Scale of Torment
9607,   //  Prismatic Scale of Healing
9608,   //  Prismatic Scale of Summoning
9609,   //  Prismatic Scale of Range
9610,   //  Prismatic Scale of Hastened Casting
9611,   //  Prismatic Scale of Preservation
9612,   //  Prismatic Scale of Faerune

];
export const zebAugIds = [
17732,   //  Turbulent Splinter of Time
17733,   //  Trueflight Splinter of Time
17845,   //  Unseen Splinter of Time
17846,   //  Frenzied Splinter of Time
17847,   //  Crashing Splinter of Time
18374,   //  Evocative Splinter of Time
18375,   //  Altered Splinter of Time
18376,   //  Conjured Splinter of Time
18377,   //  Lyrical Splinter of Time
18639,   //  Howling Splinter of Time
19053,   //  Runic Splinter of Time
24130,    //  Corrupted Splinter of Time

];
export const holidayAugIds = [
24133,   //  Polished Egg of Rage
24134,   //  Egg of Armored Protection
24135,   //  Egg of Abominable Rituals
24136,   //  Frozen Egg of Stamina
24137,   //  Flawless Egg of Deftness

];
export const otherAugIds = [

];
    // Determine AugSource based on item name patterns
export const sourceMappings = [
    { source: AugSource.Veeshans, ids: veeshanAugIds },
    { source: AugSource.Seru,      ids: seruAugIds },
    { source: AugSource.Sleepers,  ids: sleeperAugIds },
    { source: AugSource.Zeb,       ids: zebAugIds },
    { source: AugSource.Vanilla,       ids: everQuestAugIds },
    { source: AugSource.Kunark,       ids: kunarkAugIds },
    { source: AugSource.Velious,       ids: veliousAugIds },
    { source: AugSource.Luclin,       ids: luclinAugIds },
    { source: AugSource.Planes,       ids: planesAugIds },
    { source: AugSource.Ykesha,      ids: ykeshaAugIds },
    { source: AugSource.Holiday,       ids: holidayAugIds },
    { source: AugSource.Other,       ids: otherAugIds },
    { source: AugSource.TradeSkill,       ids: tradeskillAugIds },
    { source: AugSource.Bazaar,       ids: bazaarAugIds }
    // To add a new source, you just add one line here!
];
