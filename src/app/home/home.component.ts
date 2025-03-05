import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TourComponent } from '../tour/tour.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, TourComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {}
