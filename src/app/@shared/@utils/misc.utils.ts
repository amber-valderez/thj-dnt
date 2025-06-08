import { ItemIdToSlotMap } from '@data/item-id-to-slot.data';
import { getBaseItemId, ItemQuality } from '@enums/item-quality.enum';
import { BankEntry } from '@models/bank-entry.type';

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
                        existingEntry.legendaryCount = count+(existingEntry.legendaryCount ?? 0);
                    } else if (id >= ItemQuality.Enchanted) {
                        existingEntry.enchantedCount = count+(existingEntry.enchantedCount ?? 0);
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
                }
                else if (id >= ItemQuality.Enchanted) {
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
