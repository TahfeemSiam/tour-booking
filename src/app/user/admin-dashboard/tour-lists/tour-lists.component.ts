import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tour-lists',
  imports: [AngularMaterialModule, MatPaginator],
  templateUrl: './tour-lists.component.html',
  styleUrl: './tour-lists.component.css',
})
export class TourListsComponent {
  displayedColumns: string[] = [
    'Name',
    'Price',
    'Location',
    'start_date',
    'end_date',
  ];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
