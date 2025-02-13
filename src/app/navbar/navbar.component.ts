import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, AngularMaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
