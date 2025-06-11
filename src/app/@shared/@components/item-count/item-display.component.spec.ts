import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDisplayComponent } from './item-display.component';
import { By } from '@angular/platform-browser';
import { ItemQuality } from '@enums/item-quality.enum';
import { ItemSlot } from '@enums/item-slot.enum';

describe('ItemDisplayComponent', () => {
    let component: ItemDisplayComponent;
    let fixture: ComponentFixture<ItemDisplayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ItemDisplayComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ItemDisplayComponent);
        component = fixture.componentInstance;
    });

    it('should display base count and link', () => {
        component.item = {
            name: 'Sword',
            baseId: 123,
            baseCount: 2,
            enchantedCount: 0,
            legendaryCount: 0,
            id: 123,
            slots: 1,
            itemSlot: ItemSlot.Primary,
        };
        fixture.detectChanges();
        const baseLink = fixture.debugElement.query(By.css('.green-text'));
        expect(baseLink.nativeElement.textContent.trim()).toBe('2');
        expect(baseLink.nativeElement.getAttribute('href')).toContain('/item/detail/123');
    });

    it('should display enchanted count and link', () => {
        component.item = {
            name: 'Sword',
            baseId: 123,
            baseCount: 0,
            enchantedCount: 3,
            legendaryCount: 0,
            id: 123 + ItemQuality.Enchanted,
            slots: 1,
            itemSlot: ItemSlot.Primary,
        };
        fixture.detectChanges();
        const enchantedLink = fixture.debugElement.query(By.css('.blue-text'));
        expect(enchantedLink.nativeElement.textContent.trim()).toBe('3');
        expect(enchantedLink.nativeElement.getAttribute('href')).toContain(`/item/detail/${123 + ItemQuality.Enchanted}`);
    });

    it('should display legendary count and link', () => {
        component.item = {
            name: 'Armguards of the Brute',
            baseId: 21995,
            baseCount: 0,
            enchantedCount: 0,
            legendaryCount: 1,
            id: 2021995,
            slots: 1,
            itemSlot: ItemSlot.Primary,
        };
        fixture.detectChanges();
        const legendaryLink = fixture.debugElement.query(By.css('.gold-text'));
        expect(legendaryLink.nativeElement.textContent.trim()).toBe('1');
        expect(legendaryLink.nativeElement.getAttribute('href')).toContain(`/item/detail/${2021995}`);
    });

    it('should display all counts and separators', () => {
        component.item = {
            name: 'Sword',
            baseId: 123,
            baseCount: 2,
            enchantedCount: 3,
            legendaryCount: 1,
            id: 123,
            slots: 1,
            itemSlot: ItemSlot.Primary,
        };
        fixture.detectChanges();
        const html = fixture.nativeElement.innerHTML;
        expect(html).toContain('2');
        expect(html).toContain('3');
        expect(html).toContain('1');
        expect(html).toContain('/');
    });

    it('should not render counts if all are zero', () => {
        component.item = {
            name: 'Empty',
            baseId: 1,
            baseCount: 0,
            enchantedCount: 0,
            legendaryCount: 0,
            id: 1,
            slots: 1,
            itemSlot: ItemSlot.Primary,
        };
        fixture.detectChanges();
        const html = fixture.nativeElement.innerHTML;
        expect(html).not.toContain('href');
    });
});
