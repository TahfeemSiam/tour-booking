import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tour } from './tour.model';
import { map, Subject } from 'rxjs';
import { Review } from './review.model';
import { TourBooking } from './booking-success/booking.model';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  http = inject(HttpClient);
  creatingReview = new Subject<false>();

  getAllTours() {
    return this.http
      .get<Tour[]>('http://localhost:5000/tour/getAllTours')
      .pipe(map((res: any) => res.data));
  }

  getATour(tourId: number) {
    return this.http
      .get<Tour[]>(`http://localhost:5000/tour/getATour/${tourId}`)
      .pipe(map((res: any) => res.data));
  }

  createTourReview(review: {
    tour_id: number;
    firstname: string;
    review: string;
  }) {
    this.http
      .post('http://localhost:5000/tour/createAReview', review)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.creatingReview.next(false);
        },
        error: (err) => console.log(err),
      });
  }

  getTourReviewsById(tourId: number) {
    return this.http
      .get<Review[]>(`http://localhost:5000/tour/getReviewByTourId/${tourId}`)
      .pipe(map((res: any) => res.data));
  }

  getToursCount() {
    return this.http.get<Number>(`http://localhost:5000/tour/countTours`);
  }

  getToursBookingsCount() {
    return this.http.get<Number>(`http://localhost:5000/tour/countBookings`);
  }

  makePaymentUsingStripe(tourBooking: TourBooking) {
    this.http
      .post(
        `http://localhost:5000/tour/stripe/${tourBooking.tour_id}`,
        tourBooking
      )
      .subscribe({
        next: (res: any) => {
          console.log(res.session.url);
          // window.open(res.session.url)?.focus();
          window.location.href = res.session.url;
        },
        error: (err) => console.log(err),
      });
  }

  makePaymentUsingSslCommerz(amount: number, id: number, name: string) {
    this.http
      .get(
        `http://localhost:5000/tour/paymentWithSslCommerz/${id}/${amount}/${name}`
      )
      .subscribe({
        next: (res: any) => {
          console.log(res.url);
          // window.open(res.url, '_blank')?.focus();
          window.location.href = res.url;
        },
        error: (err) => console.log(err),
      });
  }

  storeBooking(tourBooking: TourBooking) {
    this.http
      .post('http://localhost:5000/tour/storeBooking', tourBooking)
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err) => console.log(err),
      });
  }

  sendConfirmationEmail() {
    this.http.get('http://localhost:5000/tour/email').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  getBookingsByUserId(userId: number) {
    return this.http
      .get<TourBooking[]>(
        `http://localhost:5000/tour/getBookingsByUserId/${userId}`
      )
      .pipe(map((res: any) => res.data));
  }
}
