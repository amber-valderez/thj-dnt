import { Routes } from '@angular/router';
import { BankComponent } from './bank/bank.component';
import { UploadComponent } from './upload/upload.component';

export const routes: Routes = [
    { path: '', redirectTo: 'bank', pathMatch: 'full' },
    { path: 'bank', component: BankComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'test', loadComponent: () => import('./test/test.component').then(m => m.TestComponent) },
];
