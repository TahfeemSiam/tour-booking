import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './navbar/contact-us/contact-us.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';

export const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: ContactUsComponent, path: 'contact' },
  { component: RegisterComponent, path: 'register' },
  { component: LoginComponent, path: 'login' },
];
