import { PlayerClass } from '@enums/index';
import {
    BardSpells,
    BeastlordSpells,
    ClericSpells,
    DruidSpells,
    EnchanterSpells,
    MagicianSpells,
    NecromancerSpells,
    PaladinSpells,
    RangerSpells,
    ShadowKnightSpells,
    ShamanSpells,
    WizardSpells,
} from '@spells/index';

export const SpellClassMappings = new Map<PlayerClass, Array<number>>([
    [PlayerClass.Bard, BardSpells],
    [PlayerClass.Beastlord, BeastlordSpells],
    [PlayerClass.Cleric, ClericSpells],
    [PlayerClass.Druid, DruidSpells],
    [PlayerClass.Enchanter, EnchanterSpells],
    [PlayerClass.Magician, MagicianSpells],
    [PlayerClass.Necromancer, NecromancerSpells],
    [PlayerClass.Paladin, PaladinSpells],
    [PlayerClass.Ranger, RangerSpells],
    [PlayerClass.Shadowknight, ShadowKnightSpells],
    [PlayerClass.Shaman, ShamanSpells],
    [PlayerClass.Wizard, WizardSpells],
]);

export const spellIdToPlayerClassMap = (): Map<number, Array<PlayerClass>> => {
    const spellIdToPlayerClassesMap = new Map<number, Array<PlayerClass>>();
    SpellClassMappings.forEach((spellIds, playerClass) => {
        spellIds.forEach((spellId) => {
            if (spellIdToPlayerClassesMap.has(spellId)) {
                const existingPlayerClasses = spellIdToPlayerClassesMap.get(spellId);
                if (existingPlayerClasses) {
                    existingPlayerClasses.push(playerClass);
                }
            } else {
                spellIdToPlayerClassesMap.set(spellId, [playerClass]);
            }
        });
    });
    return spellIdToPlayerClassesMap;
};
