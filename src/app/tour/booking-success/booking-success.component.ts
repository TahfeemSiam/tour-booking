import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { TourService } from '../tour.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TourBooking } from './booking.model';

@Component({
  selector: 'app-booking-success',
  imports: [NavbarComponent, AngularMaterialModule],
  templateUrl: './booking-success.component.html',
  styleUrl: './booking-success.component.css',
})
export class BookingSuccessComponent implements OnInit {
  tourService = inject(TourService);
  activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const tourBooking = new TourBooking(
        Number(params['tourId']),
        params['tourName'],
        Number(params['amount']),
        params['userId']
      );
      console.log(tourBooking);
      this.tourService.storeBooking(tourBooking);
    });
  }
}
