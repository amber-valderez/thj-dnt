import { ItemIdToSlotMap } from '@data/item-id-to-slot.data';
import { getBaseItemId, ItemQuality } from '@enums/item-quality.enum';
import { BankEntry } from '@models/bank-entry.type';

export const expectedBankFiles = [
    'dntbank-inventory.txt',
    'dntcraft-inventory.txt',
    'dntepics-inventory.txt',
    'dntspells-inventory.txt',
    'dntaugs-inventory.txt',
];

export function outputFileToJson(rawData: string, filterByName: string | undefined, skipSharedSlots: boolean = true): BankEntry[] {
    // Split the raw data by new lines
    const lines = rawData.split('\n');

    // Define an array to store the results
    const result: BankEntry[] = [];

    const blacklistedItemIds = [
        9990, // Skin of Milk
        9991, // Bread Cakes
        17005, // Backpack
        17423, // Adventurer's Pack
        18756, // Tattered Note
        976012, // Large Bank Box,
        17138, // Grandmaster's Carry-All
        500020, // Hero's Box of Holding (Red)
        500022, // Hero's Box of Holding (Yellow)
        500023, // Hero's Box of Holding (Green)
        500021, // Hero's Box of Holding (Orange)
        500024, // Hero's Box of Holding (Blue)
        500025, // Hero's Box of Holding (Purple)
        500026, // Hero's Box of Holding (White)
        500027, // Hero's Box of Holding (Black)
        500028, // Hero's Box of Holding
        500029, // Hero's Box of Holding (Not a Mimic)
        500030, // Bag of Bartering
        500031, // Belt Pouches of Bartering
        17899, // Trader's Satchel
        2001800, // Decanter of Endless Hot Chocolate (Legendary)
        56051, // Platter of Endless Turkey
        4039, // Platter of Endless Cookies
        500010, // Hero's Rucksack
        500011, // Hero's Rucksack (Black)
        500012, // Hero's Rucksack (Red)
        500013, // Hero's Rucksack (White)
        500014, // Hero's Rucksack (Orange)
        500015, // Hero's Rucksack (Yellow)
        500016, // Hero's Rucksack (Green)
        500017, // Hero's Rucksack (Light Blue)
        500018, // Hero's Rucksack (Blue)
        500019, // Hero's Rucksack (Purple)
        9246, // Grandmaster Tailor's Needle
        
    ];

    const blacklistedItemLocations = ['Primary', 'Secondary', 'Chest'];

    // Iterate through each line
    for (let i = 1; i < lines.length; i++) {
        // Skip the first line (headers)
        const line = lines[i].trim();

        // Skip empty lines
        if (line === '') continue;

        // Split the line by tabs or spaces
        const columns = line.split(/\s{2,}|\t/); // Match any number of spaces or tab

        // Ensure the line has the expected number of columns
        if (columns.length === 5) {
            const [location, name, idValue, _count, slots] = columns;
            const count = +_count; // Coerce count to number
            const id = +idValue; // coerce string to number
            const baseId = getBaseItemId(id);
            const isSharedBank = location.startsWith('SharedBank');

            if (filterByName && !name.toLowerCase().includes(filterByName.toLowerCase())) {
                continue;
            }

            if (id === 0 || blacklistedItemIds.includes(baseId) || blacklistedItemLocations.includes(location)) {
                continue;
            }

            if (isSharedBank && skipSharedSlots) {
                continue;
            }

            if (result.some((entry) => entry.baseId === baseId)) {
                const existingEntry = result.find((entry) => entry.baseId === baseId);
                if (existingEntry) {
                    if (id >= ItemQuality.Legendary) {
                        existingEntry.legendaryCount = count + (existingEntry.legendaryCount ?? 0);
                    } else if (id >= ItemQuality.Enchanted) {
                        existingEntry.enchantedCount = count + (existingEntry.enchantedCount ?? 0);
                    } else {
                        existingEntry.baseCount += count;
                    }
                    continue;
                }
            } else {
                const itemSlot = ItemIdToSlotMap.has('' + baseId) ? ItemIdToSlotMap.get('' + baseId) ?? 0 : 0;

                let normalizedName = name;
                if (id >= ItemQuality.Legendary) {
                    normalizedName = name.replace(/\s*\(Legendary\)$/i, '').trim();
                } else if (id >= ItemQuality.Enchanted) {
                    normalizedName = name.replace(/\s*\(Enchanted\)$/i, '').trim();
                }

                const bankEntry: BankEntry = {
                    location,
                    name: normalizedName,
                    id: id,
                    baseCount: 0,
                    slots: +slots,
                    baseId: baseId,
                    itemSlot: itemSlot,
                };
                if (count) {
                    if (id >= ItemQuality.Legendary) {
                        bankEntry.legendaryCount = +count;
                    } else if (id >= ItemQuality.Enchanted) {
                        bankEntry.enchantedCount = +count;
                    } else {
                        bankEntry.baseCount = +count;
                    }
                }
                result.push(bankEntry);
            }
        }
    }
    return result;
}
