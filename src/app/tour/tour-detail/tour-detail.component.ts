import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { TourService } from '../tour.service';
import { Observable } from 'rxjs';
import { Tour } from '../tour.model';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { Review } from '../review.model';
import { checkIfUserIsLoggedIn } from '../../route.guards';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TourBooking } from '../booking-success/booking.model';

@Component({
  selector: 'app-tour-detail',
  imports: [
    AngularMaterialModule,
    NavbarComponent,
    CommonModule,
    FormsModule,
    DatePipe,
    MatDialogModule,
  ],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourDetailComponent implements OnInit {
  tour!: Observable<Tour[]>;
  route = inject(ActivatedRoute);
  tourService = inject(TourService);
  review!: string;
  tourId!: number;
  reviewObj!: {
    tour_id: number;
    firstname: string;
    review: string;
  };

  image: string = '';

  reviewBtn = false;

  reviews!: Observable<Review[]>;
  selected = 'Pay Using Stripes';

  showStripesBtn = true;
  showSslBtn = false;

  userId = localStorage.getItem('userId');

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(UnauthorizedUserDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.tour = this.tourService.getATour(Number(param['id']));
      this.tourId = Number(param['id']);
    });

    this.tourService.creatingReview.subscribe((res) => {
      this.reviewBtn = res;
      this.review = '';
      this.reviews = this.tourService.getTourReviewsById(this.tourId);
    });

    this.reviews = this.tourService.getTourReviewsById(this.tourId);
  }

  submitReview() {
    const checkIfValid = checkIfUserIsLoggedIn();
    if (checkIfValid) {
      this.reviewBtn = true;
      const firstname = String(localStorage.getItem('firstname'));
      this.reviewObj = {
        tour_id: this.tourId,
        firstname: firstname,
        review: this.review,
      };
      console.log(this.reviewObj);
      this.tourService.createTourReview(this.reviewObj);
    } else {
      this.openDialog();
    }
  }

  sendPaymentRequestUsingStripe(
    amount: number,
    tourId: number,
    tourName: string
  ) {
    if (checkIfUserIsLoggedIn()) {
      const tourBooking = new TourBooking(
        tourId,
        tourName,
        amount,
        Number(this.userId)
      );
      this.tourService.makePaymentUsingStripe(tourBooking);
    } else {
      this.openDialog();
    }
  }

  sendPaymentRequestUsingSslCommerz(
    amount: number,
    tourId: number,
    tourName: string
  ) {
    if (checkIfUserIsLoggedIn()) {
      this.tourService.makePaymentUsingSslCommerz(amount, tourId, tourName);
    } else {
      this.openDialog();
    }
  }

  showOrHidePaymentsButtons() {
    if (this.selected == 'Pay Using Stripes') {
      this.showStripesBtn = true;
      this.showSslBtn = false;
    } else {
      this.showStripesBtn = false;
      this.showSslBtn = true;
    }
  }

  changeImage(image: string) {
    this.image = image;
  }
}

@Component({
  selector: 'unauthorized-user-dialog',
  templateUrl: 'unauthorized-user.html',
  imports: [MatDialogModule, RouterModule, AngularMaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedUserDialog {}
