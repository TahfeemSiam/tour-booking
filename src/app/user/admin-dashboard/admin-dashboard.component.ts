import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule, AngularMaterialModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {}
