import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    NavbarComponent,
    RouterModule,
    AngularMaterialModule,
    GoogleSigninButtonModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userService = inject(UserService);
  token!: boolean;
  userRegistering: boolean = false;

  readonly dialog = inject(MatDialog);

  // openDialog() {
  //   const dialogRef = this.dialog.open(RegistrationCompleteDialog);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  ngOnInit(): void {
    // this.token = this.tokenExpired(
    //   'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYzUzNGZhNWI4Y2FjYTIwMWNhOGQwZmY5NmI1NGM1NjIyMTBkMWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzY2MDkwMzEzODQtYzhmcWE3NWdmYnVuamtmNGlxMzdvaDJpZzFxNDJnZzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzY2MDkwMzEzODQtYzhmcWE3NWdmYnVuamtmNGlxMzdvaDJpZzFxNDJnZzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDExMzQyMDIwNjI5MDU0ODY3NTAiLCJlbWFpbCI6InRhaGZlZW0uc2lhbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzM5NTA2OTMwLCJuYW1lIjoiVGFoZmVlbSBTaWFtIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0l1dGc2QTZCbHJHM0Y4TnRVdjZScmtQMi16bmY5Vkxyd2Jfb0Y1SG1lR09IYkdDQT1zOTYtYyIsImdpdmVuX25hbWUiOiJUYWhmZWVtIiwiZmFtaWx5X25hbWUiOiJTaWFtIiwiaWF0IjoxNzM5NTA3MjMwLCJleHAiOjE3Mzk1MTA4MzAsImp0aSI6IjYwOGU2ZjhiYjc1NzkwMDUyZmFiZDJmYmRkYTE4OTkzM2IyNmM1ZTQifQ.m-VZswSWy5YowIPcZ95TuZGxAnoZfNPM6nsvguPFQaHhRRKd5BbRqLqv-HgJvE0MlfgInEzaWOfInlRQyr7zjDaFoWNrC8KEwbr6k-3XKZBu0TQ94OXLPFIhDzVAQI201JVHCIHGuhF9Y6EtaH4mGQzmVruZ9OoD-N8Yzj1wy4v5flddEUKjl9tUPFOOAuCz5iBaDQz4teJTk6Mg4ArLA3mTJJdCzk_pit9qC9PG7qqqkcyaBMVQjY2vOTwXeFZRPtJwHwi0iT4HujyDiQ-TZutcacVK4sqyfUwnXsCquum8ynyMnvTDmPsY1x2wNAgWcVR340ltFFvDLJu-bUI04g'
    // );
    // if (this.token) {
    //   console.log('Token Expired');
    // } else {
    //   console.log('Valid Token');
    // }
    this.userService.signInUsingGoogle();

    this.userService.userSignUp.subscribe((res) => {
      this.userRegistering = res;
      const dialogRef = this.dialog.open(RegistrationCompleteDialog);

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }

  // tokenExpired(token: string) {
  //   const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  //   return Math.floor(new Date().getTime() / 1000) >= expiry;
  // }

  signUp(form: NgForm) {
    this.userRegistering = true;
    this.userService.firebaseSignUp(form);
  }
}

@Component({
  selector: 'registration-complete-dialog',
  templateUrl: 'registration-complete-dialog.html',
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationCompleteDialog {}
