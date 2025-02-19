import { Component, inject } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [AngularMaterialModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  router = inject(Router);
  firtname = localStorage.getItem('firstname');
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('firstname');
    this.router.navigate(['/login']);
  }
}
