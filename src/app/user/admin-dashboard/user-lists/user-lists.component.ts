import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-lists',
  imports: [AngularMaterialModule, MatPaginator],
  templateUrl: './user-lists.component.html',
  styleUrl: './user-lists.component.css',
})
export class UserListsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  userService = inject(UserService);
  usersObs!: Observable<User[]>;
  users: User[] = [];
  dataSource = new MatTableDataSource<User>(this.users);
  displayedColumns: string[] = [
    'Firstname',
    'Lastname',
    'Email',
    'Gender',
    'User Role',
  ];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.usersObs = this.userService.getAllUsers();
    this.usersObs.subscribe((res: User[]) => {
      this.users = res;
      this.dataSource.data = this.users;
    });
  }
}
