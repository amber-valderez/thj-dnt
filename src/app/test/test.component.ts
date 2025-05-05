import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, writeBatch } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemDto } from '../@shared/@interfaces/item-dto.interface';
import { CharacterEquipment } from '../@shared/@interfaces/char-equipment.interface';
import { AugmentSlotType } from '../@shared/@enums/augment-slot.enum';
import { ItemCardComponent } from '../@components/item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

interface Item {
    Name: string;
}

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
    imports: [ItemCardComponent, CommonModule, MatSlideToggleModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {
    firestore = inject(Firestore);
    readonly BATCH_SIZE = 500;

    public items: ItemDto[] = [];
    public _isSimpleMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isSimpleMode$: Observable<boolean> = this._isSimpleMode$.asObservable();
    constructor(private httpClient: HttpClient) {}

    async uploadItemsToFirestore(items: ItemDto[]): Promise<void> {
        const itemCollection = collection(this.firestore, 'db');

        for (let i = 0; i < items.length; i += this.BATCH_SIZE) {
            const batch = writeBatch(this.firestore);
            const chunk = items.slice(i, i + this.BATCH_SIZE);
            chunk.forEach((item) => {
                const itemDoc = doc(itemCollection, item.Id.toString());
                batch.set(itemDoc, item);
            });
            await batch.commit();
            console.log(`Committed batch ${i / this.BATCH_SIZE + 1} of ${Math.ceil(items.length / this.BATCH_SIZE)}`);
        }
    }
    ngOnInit(): void {
        this.httpClient.get<ItemDto[]>('assets/thj-scrap.json').subscribe((data) => {
            console.log(data.length);
            // this.uploadItemsToFirestore(data);
        });
        this.items = [
            {
                Id: 2020542,
                Name: 'Singing Short Sword (Legendary)',
                Class: 'Bard',
                Slots: 'Secondary, Primary, Range',
                Size: 'Medium',
                Skill: 'One_Hand_Slashing',
                Strength: 30,
                Stamina: 10,
                Agility: 0,
                Dexterity: 20,
                Intelligence: 0,
                Wisdom: 0,
                Charisma: 40,
                HeroicStrength: 8,
                HeroicStamina: 3,
                HeroicAgility: 0,
                HeroicDexterity: 5,
                HeroicIntelligence: 0,
                HeroicWisdom: 0,
                HeroicCharisma: 10,
                MagicResist: 20,
                FireResist: 20,
                ColdResist: 20,
                DiseaseResist: 20,
                PoisonResist: 20,
                HeroicMagicResist: 5,
                HeroicFireResist: 5,
                HeroicColdResist: 5,
                HeroicDiseaseResist: 5,
                HeroicPoisonResist: 5,
                HP: 200,
                Mana: 0,
                Endurance: 0,
                AC: 0,
                BaseDamage: 32,
                Delay: 26,
                Attack: 13,
                Haste: 0,
                HPRegen: 0,
                ManaRegen: 0,
                EndRegen: 0,
                Weight: 2,
                Accuracy: 5,
                Avoidance: 0,
                Clairvoyance: 0,
                CombatEffects: 0,
                DamageShield: 0,
                DmgShieldMitigation: 0,
                DoTShield: 0,
                HealAmount: 0,
                Shielding: 0,
                SpellDamage: 0,
                SpellShield: 0,
                Strikethrough: 0,
                StunResist: 0,
                Effect: 'Dance of the Blade',
                FocusEffect: null,
                ClickEffect: 'Dance of the Blade',
                ClickCastingTime: 'Instant',
                ProcEffect: null,
                ClickEffectType: 'Click from inventory with Level/Class/Race requirement.',
                BardSkill: 'Item Lore: Singing Short Sword',
                ProcRateModifier: 20,
                AugmentSlots: [
                    {
                        SlotNumber: 1,
                        SlotType: AugmentSlotType.Stats,
                    },
                    {
                        SlotNumber: 2,
                        SlotType: AugmentSlotType.Elite,
                    },
                    {
                        SlotNumber: 3,
                        SlotType: AugmentSlotType.Weapon,
                    },
                    {
                        SlotNumber: 6,
                        SlotType: AugmentSlotType.WeaponGlamour,
                    },
                ],
                DropSources: [],
            },
            {
                Id: 2009289,
                Name: 'Necklace of Eternal Visions (Legendary)',
                Class: 'Bard, Cleric, Paladin, Shadowknight, Warrior',
                Slots: 'Neck',
                Size: 'Small',
                Skill: 'One_Hand_Slashing',
                Strength: 0,
                Stamina: 40,
                Agility: 0,
                Dexterity: 40,
                Intelligence: 36,
                Wisdom: 36,
                Charisma: 50,
                HeroicStrength: 0,
                HeroicStamina: 10,
                HeroicAgility: 0,
                HeroicDexterity: 10,
                HeroicIntelligence: 9,
                HeroicWisdom: 9,
                HeroicCharisma: 13,
                MagicResist: 30,
                FireResist: 30,
                ColdResist: 30,
                DiseaseResist: 30,
                PoisonResist: 30,
                HeroicMagicResist: 8,
                HeroicFireResist: 8,
                HeroicColdResist: 8,
                HeroicDiseaseResist: 8,
                HeroicPoisonResist: 8,
                HP: 380,
                Mana: 360,
                Endurance: 180,
                AC: 90,
                BaseDamage: 0,
                Delay: 0,
                Attack: 10,
                Haste: 0,
                HPRegen: 0,
                ManaRegen: 0,
                EndRegen: 0,
                Weight: 3.5,
                Accuracy: 10,
                Avoidance: 0,
                Clairvoyance: 0,
                CombatEffects: 0,
                DamageShield: 0,
                DmgShieldMitigation: 0,
                DoTShield: 0,
                HealAmount: 36,
                Shielding: 2,
                SpellDamage: 36,
                SpellShield: 0,
                Strikethrough: 0,
                StunResist: 0,
                Effect: null,
                FocusEffect: 'Preservation of Mithaniel',
                ClickEffect: null,
                ClickCastingTime: null,
                ProcEffect: null,
                ClickEffectType: null,
                BardSkill: null,
                ProcRateModifier: 20,
                AugmentSlots: [
                    {
                        SlotNumber: 1,
                        SlotType: AugmentSlotType.Stats
                    },
                ],
                DropSources: [
                    {
                        Zone: {
                            Id: 190,
                            Name: 'Unknown',
                        },
                        NPCs: [
                            {
                                Id: 223167,
                                Name: 'Innoruuk',
                                DropChance: 10,
                            },
                        ],
                    },
                ],
            },
        ];

        this.items.filter(item => {

        })
        // const characterEquipment: CharacterEquipment = {
        //     Neck: items[0],
        // };
    }

    onDisplayModeChange(event: MatSlideToggleChange): void {
        this._isSimpleMode$.next(event.checked);
    }
}
