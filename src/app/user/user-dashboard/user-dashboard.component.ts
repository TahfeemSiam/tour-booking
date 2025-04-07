import { Component, inject, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { Router, RouterModule } from '@angular/router';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TourService } from '../../tour/tour.service';
import { TourBooking } from '../../tour/booking-success/booking.model';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterModule, AngularMaterialModule, CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  router = inject(Router);
  userService = inject(UserService);
  tourService = inject(TourService);
  userId = localStorage.getItem('userId');
  user!: Observable<User[]>;
  tourBookings!: Observable<TourBooking[]>;

  ngOnInit(): void {
    this.user = this.userService.getUserInfoById(Number(this.userId));
    this.tourBookings = this.tourService.getBookingsByUserId(
      Number(this.userId)
    );
  }

  updateUserinfo(form: NgForm) {}

  details(tourId: number) {
    this.router.navigate(['detail', tourId]);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('firstname');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
