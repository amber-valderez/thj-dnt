import { Component, inject } from '@angular/core';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BankComponent } from '@components/bank/bank.component';
import { FileDropDirective } from 'app/@shared/@directives/drag-and-drop-file-upload/drag-and-drop-file-upload.directive';
import { CommonModule } from '@angular/common';
import { onFilesDropped } from '@utils/file-upload.utils';

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss'],
    standalone: true,
    imports: [BankComponent, CommonModule, FileDropDirective],
})
export class PersonalComponent {
    private firestore = inject(Firestore);
    public items: Observable<any[]>;
    public isDragging = false;
    public _name$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public name$ = this._name$.asObservable();

    constructor(private route: ActivatedRoute) {
        const _name = this.route.snapshot.paramMap.get('name')?.toLowerCase();
        if (_name) {
            this._name$.next(_name);
        }
        const name = `${_name}-inventory.txt`;
        const itemCollection = collection(this.firestore, 'items');
        const bankData = query(itemCollection, where('__name__', '==', name));
        this.items = collectionData(bankData);
    }

    onFilesDropped(files: FileList): void {
        onFilesDropped(this.firestore, files);
    }
}
