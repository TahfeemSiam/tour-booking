import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { Router, RouterModule } from '@angular/router';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TourService } from '../../tour/tour.service';
import { TourBooking } from '../../tour/booking-success/booking.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterModule, AngularMaterialModule, CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDashboardComponent implements OnInit {
  router = inject(Router);
  userService = inject(UserService);
  tourService = inject(TourService);
  userId = localStorage.getItem('userId');
  user!: Observable<User[]>;
  tourBookings!: Observable<TourBooking[]>;

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.user = this.userService.getUserInfoById(Number(this.userId));
    this.tourBookings = this.tourService.getBookingsByUserId(
      Number(this.userId)
    );
  }

  updateUserinfo(form: NgForm) {
    this.userService
      .updateUserInfo(form.form.value, Number(this.userId))
      .subscribe({
        next: (res) => {
          const dialogRef = this.dialog.open(UserInfoUpdatedDialog);

          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${res}`);
          });
        },
        error: (err) => console.log(err),
      });
  }

  openBookingCancelDialog(tourId: number) {
    const dialogRef = this.dialog.open(CancelBookingDialog, {
      data: { tourId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${tourId}`);
    });
  }

  cancelBooking(tourId: number) {
    this.userService.cancelTourBooking(tourId);
  }

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

@Component({
  selector: 'booking-canceled-content-dialog',
  templateUrl: 'booking-canceled.html',
  imports: [MatDialogModule, AngularMaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelBookingDialog {
  userService = inject(UserService);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { tourId: number }) {}

  cancelBooking(tourId: number) {
    this.userService.cancelTourBooking(tourId);
  }
}

@Component({
  selector: 'user-updated-content-dialog',
  templateUrl: 'user-info-updated.html',
  imports: [MatDialogModule, AngularMaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoUpdatedDialog {}
