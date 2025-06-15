export enum AugSource {
    Veeshans = 'Veeshan\'s Peak',
    Sleepers = 'The Sleeper\'s Tomb',
    Seru = 'Sanctus Seru',
    Zeb = 'The Plane of Time',
    Holiday = 'Holiday Event',
    Vanilla = 'EverQuest',
    Kunark = 'Ruins of Kunark',
    Velious = 'Scars of Velious',
    Luclin = 'Shadows of Luclin',
    Planes = 'Planes of Power',
    Ykesha = 'Legacy of Ykesha',
    TradeSkill = 'Crafted',
    Other = 'Other',
    Bazaar = 'The Bazaar'
   
}

export const getSource = (category: string): AugSource => {
    return Object.values(AugSource).find(
        (value) => value.toLowerCase() === category.toLowerCase()
    ) as AugSource;
}