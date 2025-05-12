import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BankComponent } from "@components/bank/bank.component";

@Component({
    selector: 'app-guild-bank',
    templateUrl: './guild-bank.component.html',
    styleUrls: ['./guild-bank.component.scss'],
    imports: [CommonModule, BankComponent],
})
export class GuildBankComponent {
    private _id$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public id$ = this._id$.asObservable();
    private firestore = inject(Firestore);
    public items: Observable<any[]>;
    constructor(private route: ActivatedRoute) {
        const _name = this.route.snapshot.paramMap.get('name');
        this._id$.next(_name);
        const itemCollection = collection(this.firestore, 'items');
        const bankData = query(itemCollection, where('__name__', 'in', [
            'dntbank-inventory.txt',
            'dntcraft-inventory.txt',
            'dntepics-inventory.txt',
            'dntspells-inventory.txt'
        ]));
        this.items = collectionData(bankData);
    }
}
