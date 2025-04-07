import { Component, inject, OnInit } from '@angular/core';
import { Tour } from '../tour.model';
import { UserService } from '../../user/user.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

@Component({
  selector: 'app-tour-search',
  imports: [NavbarComponent, AngularMaterialModule, CommonModule, RouterModule],
  templateUrl: './tour-search.component.html',
  styleUrl: './tour-search.component.css',
})
export class TourSearchComponent implements OnInit {
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  tours!: Observable<Tour[]>;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tours = this.userService.searchForATour(params['search']);
    });
  }
}
