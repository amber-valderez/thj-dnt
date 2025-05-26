import { PlayerClass } from "@enums/player-class.enum";

// Only grab IDs for base items.  
// Enchanted/Legendary are automatically handled because they add 1,000,000 increments to IDs.

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
    20366, // Mahlin's Mystical Bongos
    20367, // Maligar's Head
    20370, // Mechanical Doll
    20535, // Mystical Lute Head
    20536, // Mystical Lute Body
    20538, // Mystical Lute
    20529, // Onyx Drake Gut
    20525, // Petrified Werewolf Skull
    20526, // Undead Dragongut Strings

    20542, // Singing Short Sword (epic 1.0)

    // Epic 1.5
    12782, // Earth Dragon Crystal
    12487, // Fire Dragon Crystal
    12783, // Wind Dragon Crystal

];

export const beastlordEpicItemIds: Array<number> = [
    4393, // Copper Medal of War

    9031, // Official Seal of the Khati Sha
    17361, // Carved Wooden Chest

    9032, // Totem of the Spider
    9033, // Wrapped Spider Totem
    9034, // Totem of the Wolf
    9035, // Wrapped Wolf Totem
    9036, // Totem of the Ice Bear
    9037, // Wrapped Ice Bear Totem
    9038, // Totem of the Gorilla
    9039, // Wrapped Gorilla Totem
    9040, // Totem of the Watcher
    9041, // Wrapped Watcher Totem
    9042, // Totem of the Alligator
    9043, // Wrapped Alligator Totem

    9044, // Sealed Box of Totems
    9045, // Seal of Elder Dumul

    17360, // Black Silk Sack
    9046, // Shards of Broken Glass
    9047, // Sack of Broken Glass
    9048, // Sack of Broken Glass

    9049, // Note for Historian Qua
    9050, // Qua's Receipt

    17363, // Rahoul's Collection Box
    9052, // Perfect Acrylia Ore
    9053, // Gem of the Void
    9054, // Chunk of Dense Fungal Padding
    9051, // Sealed Collection Box

    9055, // Jagged Claw of Rending (primary)
    9056, // Jagged Claw of Rending (secondary)

    9057, // Khati Sha Seal of War
    17362, // Acrylia Gilded Box
    9059, // Draz Nurakk's Head

    8495, // Claw of the Savage Spirit (primary, epic 1.0)
    8496, // Claw of the Savage Spirit (secondary, epic 1.0)
];

export const berserkerEpicItemIds = [
    60203, // Burning Essence of Rage
    60206, // Decaying Liver
    60207, // Gnashing Kobold Paw
    60208, // Scent Gland
    60200, // Treanik's Tarnished Axe

    68299, // Kerasian Axe of Ire (epic 1.0)
];

export const clericEpicItemIds = [
    28018, // Lord Gimblox's Signet Ring
    28044, // Lord Bergurgle's Crown 
    24995, // Pearlescent Fragment
    18170, // Singed Scroll
    9945, // Shissar Cerebral Cortex 

    5532, // Water Sprinkler of Nem Ankh (epic 1.0)
];

export const druidEpicItemIds = [
    17860, // Shiny Tin Bowl

    20464, // Ripened Heartfruit
    20465, // Sweetened Mudroot
    20466, // Speckled Molded Mushroom
    20467, // Chilled Tundra Root
    20473, // Hardened Mixture

    18960, // Ancient Pattern
    12774, // Rose of Firiona
    20456, // Platinum Speckled Powder
    5664, // Jade Reaver
    20455, // Enchanted Clay

    20440, // Elaborate Scimitar

    20690, // Chunk of Tundra
    20689, // Clean Lakewater
    20688, // Ancient Rock
    20695, // Warm Pulsing Treant Heart
    20698, // Cleansed Spirit of Antonica

    20692, // Ocean of Tears Seavines
    20693, // Green Heartwood Branch
    20691, // Kedge Cave Crystals
    20694, // Gleaming Unicorn Horn
    20697, // Cleansed Spirit of Faydwer

    20696, // Froglok Essence
    20686, // Green Tree Bark
    20685, // Pure Lakewater
    20687, // Pod of Seawater
    20699, // Cleansed Spirit of Kunark

    20461, // Pulsing Green Stone
    20468, // Warmly Glowing Stone
    20462, // Softly Glowing Stone

    20490, // Nature Walker's Scimitar (epic 1.0)
];

export const enchanterEpicItemIds = [
    1360, // Shining Metallic Robes 
    10604, // Jeb's Seal
    17861, // Enchanters Sack

    10606, // Xolion Rod
    10607, // Innoruuk's Word
    10608, // Chalice of Kings
    10609, // Snow Blossoms
    10610, // 1st piece of staff

    10614, // Spoon
    10615, // The One Key
    10616, // Lost Scroll
    10617, // Charm and Sacrifice
    10611, // 2nd piece of staff

    10618, // Enchanted Diamond
    10619, // Enchanted Sapphire
    10620, // Enchanted Ruby
    10621, // Enchanted Emerald
    10612, // 3rd piece of staff

    10625, // Sands of the Mystics
    10624, // Essence of a Vampire
    10623, // Essence of a Ghost
    10622, // Head of a Serpent
    10613, // 4th piece of staff

    10650, // Staff of the Serpent (epic 1.0)

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
    6361, // Shovel of Ponz
    6360, // Broom of Trilon
    2463, // Pegasus Feather Cloak
    28039, // Power of Water
    28038, // Power of Earth
    28037, // Power of Wind
    28036, // Power of Fire
    28031, // Power of the  Elements
    18958, // Power of the Orb
    28040, // Tears of Erollisi
    28041, // Rain of Karana
    11567, // Staff of Elemental Mastery: Earth
    11569, // Staff of Elemental Mastery: Water
    28007, // Torch of the Elements
    28000, // Torn Page of Magi`kot pg. 1
    28001, // Torn Page of Magi`kot pg. 2
    28002, // Torn Page of Magi`kot pg. 3
    28003, // Words of Magi`kot
    28027, // Torn Page of Mastery Fire
    28028, // Torn Page of Mastery Wind
    28029, // Torn Page of Mastery Earth
    28030, // Torn Page of Mastery Water
    28004, // Words of Mastery
    20764, // Crown of Elemental Mastery
    16545, // Shovel
    16544, // Broom

    28034, // Orb of Mastery (epic 1.0)
];

export const monkEpicItemIds = [
    18195, // Immortals
    12256, // Robe of the Lost Circle
    12980, // Metal Pipe (Chardok)
    12979, // Metal Pipe (Karnor's Castle)

    10652, // Celestial Fists (epic 1.0)
];

export const necromancerEpicItemIds = [
    20641, // Head of Sir Edwin Motte
    20655, // Slime Blood of Cazic-Thule
    20656, // Eye of Innoruuk
    20654, // Manisi Herb
    1320, // Flowing Black Robe

    20938, // Silver Disc (for Cloak of Spiroc Feathers)
    20783, // Black Silk Cape (for Cloak of Spiroc Feathers)
    20782, // Spiroc Feathers (for Cloak of Spiroc Feathers)
    1278, // Cloak of Spiroc Feathers

    20544, // Scythe of the Shadowed Soul (epic 1.0)
];

export const paladinEpicItemIds = [
    19070, // Torn, Frost-covered Book
    19071, // Torn, Burnt Book
    29000, // Tainted Darksteel Sword
    29001, // Tainted Darksteel Breastplate
    29002, // Tainted Darksteel Shield
    12197, // Glowing Sword Hilt

    5504, // SoulFire
    11050, // Fiery Avenger
    10099, // Fiery Defender (epic 1.0)
];

export const rangerEpicItemIds = [
    20484, // Shattered Emerald of Corruption
    5664, // Jade Reaver
    20494, // Swirling Sphere of Color
    20468, // Warmly Glowing Stone

    20487, // Swiftwind (epic 1.0)
    20488, // Earthcaller (epic 1.0)
];

export const rogueEpicItemIds = [
    1253, // Robe of the Kedge
    1360, // Shining Metallic Robes 

    11057, // Ragebringer (epic 1.0)
];

export const shadowknightEpicItemIds = [
    5430, // Blade of Abrogation
    14371, // Decrepit Hide
    14372, // Drake Spine
    11609, // Soul Leech, Dark Sword of Blood
    5403, // Ghoulbane
    14365, // Cough Elixir
    3141, // Darkforge Breastplate

    14383, // Innoruuk's Curse (epic 1.0)

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
    20679, // Spiroc Wingblade
    17859, // Red Scabbard

    10908, // Jagged Blade of War (epic 1.0)
];

export const wizardEpicItemIds = [
    14337, // Blue Crystal Staff
    14338, // Gnarled Staff
    14349, // Green Oil
    14319, // Golem Sprocket
    14335, // Arantir's Ring
    14341, // Staff of the Four (epic 1.0)

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
