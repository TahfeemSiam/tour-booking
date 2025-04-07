import { Component, inject, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { Observable } from 'rxjs';
import { Tour } from './tour.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TourService } from './tour.service';

@Component({
  selector: 'app-tour',
  imports: [AngularMaterialModule, CommonModule, RouterModule],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css',
})
export class TourComponent implements OnInit {
  tours!: Observable<Tour[]>;
  tourService = inject(TourService);
  ngOnInit() {
    this.tours = this.tourService.getAllTours();
  }
}
