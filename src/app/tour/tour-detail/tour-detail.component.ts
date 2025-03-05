import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TourService } from '../tour.service';
import { Observable } from 'rxjs';
import { Tour } from '../tour.model';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-tour-detail',
  imports: [AngularMaterialModule, NavbarComponent, CommonModule],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css',
})
export class TourDetailComponent implements OnInit {
  tour!: Observable<Tour[]>;
  route = inject(ActivatedRoute);
  tourService = inject(TourService);
  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.tour = this.tourService.getATour(Number(param['id']));
    });
  }
}
