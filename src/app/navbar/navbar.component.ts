import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { checkTokenExpiry } from '../route.guards';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, AngularMaterialModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  showUserButton = false;
  showAdminButton = false;
  showUserDashboardButton = false;

  user_role = localStorage.getItem('user_role');

  ngOnInit(): void {
    if (!this.user_role || checkTokenExpiry()) {
      this.showUserButton = true;
      this.showAdminButton = false;
      this.showUserDashboardButton = false;
    } else {
      if (this.user_role == 'user' && !checkTokenExpiry()) {
        this.showAdminButton = false;
        this.showUserButton = false;
        this.showUserDashboardButton = true;
      } else {
        this.showAdminButton = true;
        this.showUserButton = false;
        this.showUserDashboardButton = false;
      }
    }

    // if (checkTokenExpiry()) {
    //   this.showUserButton = true;
    //   this.showAdminButton = false;
    // } else {
    //   this.showUserButton = false;
    //   this.showAdminButton = true;
    // }
  }
}
