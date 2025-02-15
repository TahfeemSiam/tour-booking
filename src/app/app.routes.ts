import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './navbar/contact-us/contact-us.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AdminDashboardComponent } from './user/admin-dashboard/admin-dashboard.component';
import { checkIfValidToken } from './route.guards';
import { CreateTourComponent } from './user/admin-dashboard/create-tour/create-tour.component';
import { TourListsComponent } from './user/admin-dashboard/tour-lists/tour-lists.component';

export const routes: Routes = [
  { component: HomeComponent, path: '' },
  {
    component: AdminDashboardComponent,
    path: 'admin',
    // canActivate: [checkIfValidToken],
    children: [
      { component: CreateTourComponent, path: 'createTour' },
      { component: TourListsComponent, path: 'tourLists' },
    ],
  },
  { component: ContactUsComponent, path: 'contact' },
  { component: RegisterComponent, path: 'register' },
  { component: LoginComponent, path: 'login' },
];
