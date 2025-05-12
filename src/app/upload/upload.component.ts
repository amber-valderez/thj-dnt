import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { onFilesDropped } from '@utils/file-upload.utils';
import { FileDropDirective } from '@directives/drag-and-drop-file-upload/drag-and-drop-file-upload.directive';
@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    imports: [CommonModule, FormsModule, FileDropDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {
    firestore = inject(Firestore);
    item$: Observable<any[]>;
    private _isDragging$ = new BehaviorSubject<boolean>(false);
    public isDragging$ = this._isDragging$.asObservable();
    constructor() {
        const itemCollection = collection(this.firestore, 'items');
        this.item$ = collectionData(itemCollection);
    }

    onFilesDropped(files: FileList): void {
        onFilesDropped(this.firestore, files);
    }
    onDragging($event: boolean) {
        this._isDragging$.next($event);
    }
}
