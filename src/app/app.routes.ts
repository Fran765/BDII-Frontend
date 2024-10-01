import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StoreComponent } from './store/store.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'store/:clientId', component: StoreComponent },
];
