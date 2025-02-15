import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    NavbarComponent,
    RouterModule,
    AngularMaterialModule,
    GoogleSigninButtonModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userService = inject(UserService);
  error: boolean = false;
  errMsg!: string;
  signingIn: boolean = false;

  ngOnInit(): void {
    this.userService.signInUsingGoogle();

    this.userService.invalidLoginCredentials.subscribe((res) => {
      this.error = true;
    });

    this.userService.invalidLoginCredentialsMsg.subscribe((res) => {
      this.errMsg = res;
    });

    this.userService.userSigningIn.subscribe((res) => {
      this.signingIn = res;
    });
  }

  signIn(form: NgForm) {
    this.signingIn = true;
    this.userService.firebaseSignIn(form);
  }
}
