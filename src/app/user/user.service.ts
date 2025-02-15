import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  authService = inject(SocialAuthService);
  token!: string;
  userSignUp = new Subject<boolean>();
  invalidLoginCredentials = new Subject<boolean>();
  invalidLoginCredentialsMsg = new Subject<string>();
  userSigningIn = new Subject<boolean>();

  signInUsingGoogle() {
    this.authService.authState.subscribe((user) => {
      this.token = user.idToken;
      const httpHeaders: HttpHeaders = new HttpHeaders({
        token: this.token,
      });
      this.http
        .post('http://localhost:5000/verify', {}, { headers: httpHeaders })
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => console.log(err),
        });
    });
  }

  firebaseSignIn(form: NgForm) {
    const { email, password } = form.form.value;
    this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnKUiAYDLZ-XwEuyN5h33sDOSTru8dCmA',
        { email, password }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.userSigningIn.next(false);
        },
        error: (err) => {
          console.log(err);
          this.invalidLoginCredentials.next(true);
          this.invalidLoginCredentialsMsg.next(err.error.error.message);
          this.userSigningIn.next(false);
        },
      });
  }

  storeUserData(form: NgForm) {
    const { firstname, lastname, email, gender } = form.form.value;
    this.http
      .post('http://localhost:5000/user/register', {
        firstname,
        lastname,
        email,
        gender,
        user_role: 'user',
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.userSignUp.next(false);
        },
        error: (err) => console.log(err),
      });
  }

  firebaseSignUp(form: NgForm) {
    const { email, password } = form.form.value;
    console.log(email, password);
    this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnKUiAYDLZ-XwEuyN5h33sDOSTru8dCmA',
        { email, password, resreturnSecureToken: true }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.storeUserData(form);
          form.reset();
        },
        error: (err) => console.log(err),
      });
  }
}
