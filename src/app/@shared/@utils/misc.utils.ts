import { ItemIdToSlotMap } from '@data/item-id-to-slot.data';
import { getBaseItemId } from '@enums/item-quality.enum';
import { BankEntry } from '@models/bank-entry.type';

export function outputFileToJson(rawData: string, filterByName: string | null, skipSharedSlots: boolean = true): BankEntry[] {
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
            const [location, name, id, count, slots] = columns;
            const isSharedBank = location.startsWith('SharedBank');
            if (filterByName && !name.toLowerCase().includes(filterByName.toLowerCase())) 
                continue;

            if (
                +id === 0 ||
                blacklistedItemIds.includes(+id) ||
                blacklistedItemLocations.includes(location)
            )
                continue;

            if (isSharedBank && skipSharedSlots) {
                continue;
            }

            if (result.some((entry) => entry.id === +id)) {
                const existingEntry = result.find((entry) => entry.id === +id);
                if (existingEntry) {
                    existingEntry.count += +count;
                    continue;
                }
            } else {
                const baseId = getBaseItemId(+id);
                const itemSlot = ItemIdToSlotMap.has('' + baseId) ? ItemIdToSlotMap.get('' + baseId) ?? 0 : 0;

                const bankEntry: BankEntry = {
                    location,
                    name,
                    id: +id,
                    count: +count,
                    slots: +slots,
                    baseId: baseId,
                    itemSlot: itemSlot,
                };
                result.push(bankEntry);
            }
        }
    }
    return result;
}

