import { PlayerClass } from "@enums/player-class.enum";
import { BardSpells } from "@spells/bard-spells";
import { BeastlordSpells } from "@spells/beastlord-spells";
import { ClericSpells } from "@spells/cleric-spells";
import { DruidSpells } from "@spells/druid-spells";
import { EnchanterSpells } from "@spells/enchanter-spells";
import { MagicianSpells } from "@spells/magician-spells";
import { NecromancerSpells } from "@spells/necromancer-spells";
import { PaladinSpells } from "@spells/paladin-spells";
import { RangerSpells } from "@spells/ranger-spells";
import { ShadowKnightSpells } from "@spells/shadow-knight-spells";
import { ShamanSpells } from "@spells/shaman-spells";
import { WizardSpells } from "@spells/wizard-spells";

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
}
