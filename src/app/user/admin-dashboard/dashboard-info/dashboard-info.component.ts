import { Component, inject, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { UserService } from '../../user.service';
import { TourService } from '../../../tour/tour.service';

@Component({
  selector: 'app-dashboard-info',
  imports: [AngularMaterialModule],
  templateUrl: './dashboard-info.component.html',
  styleUrl: './dashboard-info.component.css',
})
export class DashboardInfoComponent implements OnInit {
  userService = inject(UserService);
  tourService = inject(TourService);
  users!: number;
  tours!: number;
  ngOnInit() {
    this.tourService.getToursCount().subscribe((res: any) => {
      this.tours = res.data[0].NumberOfTours;
    });

    this.userService.getUsersCount().subscribe((res: any) => {
      this.users = res.data[0].NumberOfUsers;
    });
  }
}
