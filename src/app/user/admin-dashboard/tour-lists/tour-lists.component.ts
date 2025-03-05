import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { MatPaginator } from '@angular/material/paginator';
import { Tour } from '../../../tour/tour.model';
import { Observable } from 'rxjs';
import { TourService } from '../../../tour/tour.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tour-lists',
  imports: [AngularMaterialModule, MatPaginator, DatePipe],
  templateUrl: './tour-lists.component.html',
  styleUrl: './tour-lists.component.css',
})
export class TourListsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tourService = inject(TourService);
  tourObs!: Observable<Tour[]>;
  tours: Tour[] = [];
  dataSource = new MatTableDataSource<Tour>(this.tours);
  displayedColumns: string[] = [
    'Name',
    'Price',
    'Location',
    'start_date',
    'end_date',
  ];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.tourObs = this.tourService.getAllTours();
    this.tourObs.subscribe((res: Tour[]) => {
      this.tours = res;
      this.dataSource.data = this.tours;
    });
  }
}

const ELEMENT_DATA = [
  {
    Name: 1,
    Price: 'Hydrogen',
    Location: 1.0079,
    start_date: 'H',
    end_date: 'E',
  },
  {
    Name: 1,
    Price: 'Hydrogen',
    Location: 1.0079,
    start_date: 'H',
    end_date: 'E',
  },
];
