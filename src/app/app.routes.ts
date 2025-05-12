import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { PersonalComponent } from './personal/personal.component';
import { GuildBankComponent } from './guild-bank/guild-bank.component';

export const routes: Routes = [
    { path: '', redirectTo: 'bank', pathMatch: 'full' },
    { path: 'bank', component: GuildBankComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'personal/:name', component: PersonalComponent },
    { path: 'test', loadComponent: () => import('./test/test.component').then(m => m.TestComponent) },
];
