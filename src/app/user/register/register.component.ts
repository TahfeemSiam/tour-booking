import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { Router, RouterModule } from '@angular/router';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../user.model';

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

  router = inject(Router);

  ngOnInit(): void {
    this.userService.signInUsingGoogle();

    this.userService.userSignUp.subscribe((res) => {
      this.userRegistering = res;
      const dialogRef = this.dialog.open(RegistrationCompleteDialog);

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
        this.router.navigate(['/login']);
      });
    });
  }

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
