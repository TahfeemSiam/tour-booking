import { Component, inject } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule, AngularMaterialModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  router = inject(Router);
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('user_role');
    this.router.navigate(['/login']);
  }
}
