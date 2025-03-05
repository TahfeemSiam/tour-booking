import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './navbar/contact-us/contact-us.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AdminDashboardComponent } from './user/admin-dashboard/admin-dashboard.component';
import {
  checkIfValidTokenAdmin,
  checkIfValidTokenSignUpOrRegister,
  checkIfValidTokenUser,
} from './route.guards';
import { CreateTourComponent } from './user/admin-dashboard/create-tour/create-tour.component';
import { TourListsComponent } from './user/admin-dashboard/tour-lists/tour-lists.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserListsComponent } from './user/admin-dashboard/user-lists/user-lists.component';
import { DashboardInfoComponent } from './user/admin-dashboard/dashboard-info/dashboard-info.component';
import { TourDetailComponent } from './tour/tour-detail/tour-detail.component';

export const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: TourDetailComponent, path: 'detail/:id' },
  {
    component: AdminDashboardComponent,
    path: 'admin',
    canActivate: [checkIfValidTokenAdmin],
    children: [
      { component: DashboardInfoComponent, path: '' },
      { component: CreateTourComponent, path: 'createTour' },
      { component: TourListsComponent, path: 'tourLists' },
      { component: UserListsComponent, path: 'userLists' },
    ],
  },
  {
    component: UserDashboardComponent,
    path: 'user',
    canActivate: [checkIfValidTokenUser],
  },
  { component: ContactUsComponent, path: 'contact' },
  {
    component: RegisterComponent,
    path: 'register',
    canActivate: [checkIfValidTokenSignUpOrRegister],
  },
  {
    component: LoginComponent,
    path: 'login',
    canActivate: [checkIfValidTokenSignUpOrRegister],
  },
];
