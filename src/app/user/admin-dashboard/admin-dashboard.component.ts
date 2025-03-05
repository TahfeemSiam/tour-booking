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
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('user_role');
    this.router.navigate(['/login']);
  }
}
