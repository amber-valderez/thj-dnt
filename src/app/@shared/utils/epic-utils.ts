import { PlayerClass } from "../@enums/player-class.enum";

export const bardEpicItemIds = [
    // Epic 1.0
    20527, // Chromadrac Gut
    20524, // Kedge Backbone
    20525, // Petrified Werewolf Skull
    11622, // Red Dragon Scales
    20528, // Red Wyrm Gut
    11602, // White Dragon Scales
    20530, // Alluring Horn
    5520, // Amygdalan Tendril
    20376, // Maestro's Symphony Page 24 Top
    20383, // Maestro's Symphony Page 24 Bottom
    20377, // Maestro's Symphony Page 25
    20366, //Mahlin's Mystical Bongos
    20367, // Maligar's Head
    20370, //Mechanical Doll
    20535, // Mystical Lute Head
    20536, // Mystical Lute Body
    20538, // Mystical Lute
    20529, // Onyx Drake Gut
    20525, // Petrified Werewolf Skull
    20526, // Undead Dragongut Strings

    // Epic 1.5
    12782, // Earth Dragon Crystal
    12487, // Fire Dragon Crystal
    12783, // Wind Dragon Crystal

];

export const beastlordEpicItemIds: Array<number> = [
    
];

export const berserkerEpicItemIds = [
    60203, // Burning Essence of Rage
    60206, // Decaying Liver
    60207, // Gnashing Kobold Paw
    60208, // Scent Gland
    60200, // Treanik's Tarnished Axe
];

export const clericEpicItemIds = [
    28018, // Lord Gimblox's Signet Ring
    28044, // Lord Bergurgle's Crown 
    24995, // Pearlescent Fragment
    18170, // Singed Scroll
    9945, // Shissar Cerebral Cortex 
];

export const druidEpicItemIds = [
    20692, // Ocean of Tears Seavines
    5664, // Jade Reaver
    20461, // Pulsing Green Stone
    20468, // Warmly Glowing Stone

];

export const enchanterEpicItemIds = [
    10624, // Essence of a Vampire
    1360, // Shining Metallic Robes 

    // Epic 2.0
    52946, // Harnessing Stone
];

export const magicianEpicItemIds = [
    10376, // Blazing Wand
    28008, // Burning Embers
    16543, // Cyclops Toes => Broom of Trilon Quest
    28042, // Dirt of Underfoot
    28043, // Elemental Binder
    10014, // Gargoyle Eye => Shovel of Ponz Quest
    16538, // Griffon Feathers => Broom of Trilon Quest
    16539, // Hill Giant Toes => Shovel of Ponz Quest
    2463, // Pegasus Feather Cloak
    28039, // Power of Water
    28037, // Power of Wind
    28036, // Power of Fire
    28041, // Rain of Karana
    11567, // Staff of Elemental Mastery: Earth
    11569, // Staff of Elemental Mastery: Water
    11566, // Staff of Elemental Mastery: Fire
    28007, // Torch of the Elements
    28000, // Torn Page of Magi`kot pg. 1
    28001, // Torn Page of Magi`kot pg. 1
    28002, // Torn Page of Magi`kot pg. 1
    28027, // Torn Page of Mastery Fire
    28028, // Torn Page of Mastery Wind
    28029, // Torn Page of Mastery Earth
    28030, // Torn Page of Mastery Water
    20764, // Crown of Elemental Mastery
    10614, // Spoon
    16545, // Shovel
];

export const monkEpicItemIds = [
    18195, // Immortals
    12980, // Metal Pipe (Chardok)
    12979, // Metal Pipe (Karnor's Castle)
];

export const necromancerEpicItemIds = [
    20655, // Slime Blood of Cazic-Thule
    20656, // Eye of Innoruuk
    20654, // Manisi Herb
];

export const paladinEpicItemIds = [
    19070, // Torn, Frost-covered Book
    10099, // Fiery Defender
    29001, // Tainted Darksteel Breastplate
    19071, // Torn, Burnt Book
    12197, // Glowing Sword Hilt
];

export const rangerEpicItemIds = [
    20484, // Shattered Emerald of Corruption
    5664, // Jade Reaver
    20494, // Swirling Sphere of Color
    20468, // Warmly Glowing Stone
    
];

export const rogueEpicItemIds = [
    1253, // Robe of the Kedge
    1360, // Shining Metallic Robes 
];

export const shadowknightEpicItemIds = [
    5430, // Blade of Abrogation
    14371, // Decrepit Hide
    14372, // Drake Spine
    11609, // Soul Leech, Dark Sword of Blood
    5403, // Ghoulbane

    // Epic 2.0
    23489, // Lhranc's Pendant
];

export const shamanEpicItemIds = [
    1673, // Child's Tear
    18457, // Crusades of the High Scale
    18458, // Head Housekeeper's Log
    18456, // Historic Article

    10651, // Spear of Fate

    57562, // Spirit-Touched Phased Spider Thorax

];

export const warriorEpicItemIds = [
    20677, // Ball of Everliving Golem
    20676, // Hand of the Maestro
    11622, // Red Dragon Scales
    20670, // Ancient Blade
    22823, // Emerald Dragon Scales
];

export const wizardEpicItemIds = [
    14337, // Blue Crystal Staff
    14338, // Gnarled Staff
    14349, // Green Oil
    14319, // Golem Sprocket

];

export const epicClassMappings = new Map<PlayerClass, Array<number>> ([
    [PlayerClass.Bard, bardEpicItemIds],
    [PlayerClass.Beastlord, beastlordEpicItemIds],
    [PlayerClass.Berserker, berserkerEpicItemIds],
    [PlayerClass.Cleric, clericEpicItemIds],
    [PlayerClass.Druid, druidEpicItemIds],
    [PlayerClass.Enchanter, enchanterEpicItemIds],
    [PlayerClass.Magician, magicianEpicItemIds],
    [PlayerClass.Monk, monkEpicItemIds],
    [PlayerClass.Necromancer, necromancerEpicItemIds],
    [PlayerClass.Paladin, paladinEpicItemIds],
    [PlayerClass.Ranger, rangerEpicItemIds],
    [PlayerClass.Rogue, rogueEpicItemIds],
    [PlayerClass.Shadowknight, shadowknightEpicItemIds],
    [PlayerClass.Shaman, shamanEpicItemIds],
    [PlayerClass.Warrior, warriorEpicItemIds],
    [PlayerClass.Wizard, wizardEpicItemIds],
]);

export const itemIdToPlayerClassMap = (): Map<number, Array<PlayerClass>> => {
    const itemIdToPlayerClassesMap = new Map<number, Array<PlayerClass>>();
    epicClassMappings.forEach((itemIds, playerClass) => {
        itemIds.forEach((itemId) => {
            if (itemIdToPlayerClassesMap.has(itemId)) {
                const existingPlayerClasses = itemIdToPlayerClassesMap.get(itemId);
                if (existingPlayerClasses) {
                    existingPlayerClasses.push(playerClass);
                }
            } else {
                itemIdToPlayerClassesMap.set(itemId, [playerClass]);
            }
        });
    });
    return itemIdToPlayerClassesMap;
}
