export type BankEntry = {
    location: string;
    name: string;
    id: number;
    count: number;
    slots: number;
    baseId: number;
    // This can be multiple slots, so we are using a bitmask to represent it
    itemSlot: number;
}