import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/user/home/home.component';
import { AuthService } from './service/auth/auth.service';
import { RedirectAuthService } from './service/auth/redirect-auth.service';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { AdminAuthService } from './service/adminAuth/admin-auth.service';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate:[RedirectAuthService]
    },
    {
        path: 'signup',
        component: RegisterComponent,
        canActivate:[RedirectAuthService]
    },
    {
        path:'home',
        component:HomeComponent,
        canActivate:[AuthService]
    },
    {
        path:'users',
        component:UserListComponent,
        canActivate:[AdminAuthService]
    },
    {
        path:'**',
        redirectTo:'login'
    }

];
