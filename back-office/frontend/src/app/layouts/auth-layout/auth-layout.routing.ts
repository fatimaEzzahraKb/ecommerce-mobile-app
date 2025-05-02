import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { LogInComponent } from 'src/app/pages/log-in/log-in.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LogInComponent },
    { path: 'register',       component: RegisterComponent }
];
