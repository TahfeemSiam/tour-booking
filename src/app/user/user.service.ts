import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  authService = inject(SocialAuthService);
  router = inject(Router);
  userSignUp = new Subject<boolean>();
  invalidLoginCredentials = new Subject<boolean>();
  invalidLoginCredentialsMsg = new Subject<string>();
  userSigningIn = new Subject<boolean>();

  getBotMessages = new Subject<any[]>();

  messages: any[] = [];

  signInUsingGoogle() {
    this.authService.authState.subscribe((user) => {
      localStorage.setItem('token', user.idToken);
      localStorage.setItem('firstname', user.firstName);
      localStorage.setItem('user_role', 'user');
      const googleUser = {
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
      };
      console.log(googleUser);
      this.storeUserData(googleUser);
      this.router.navigate(['/user']);
      // const httpHeaders: HttpHeaders = new HttpHeaders({
      //   token: user.idToken,
      // });
      // this.http
      //   .post('http://localhost:5000/verify', {}, { headers: httpHeaders })
      //   .subscribe({
      //     next: (res) => {
      //       console.log(res);
      //     },
      //     error: (err) => console.log(err),
      //   });
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
        next: (res: any) => {
          console.log(res);
          this.getUserByEmail(res.email, res.idToken);
        },
        error: (err) => {
          console.log(err);
          this.invalidLoginCredentials.next(true);
          this.invalidLoginCredentialsMsg.next(err.error.error.message);
          this.userSigningIn.next(false);
        },
      });
  }

  storeUserData(user: any) {
    if (user.firstName) {
      const { firstname, lastname, email, gender } = user.form.value;
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
    } else {
      this.http
        .post('http://localhost:5000/user/register', {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          gender: 'not-set',
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

  getUserByEmail(email: string, token: string) {
    this.http
      .get(`http://localhost:5000/user/getUserByEmail/${email}`)
      .subscribe({
        next: (res: any) => {
          console.log(res.data);
          if (res.data[0].user_role == 'user') {
            localStorage.setItem('user_role', res.data[0].user_role);
            localStorage.setItem('firstname', res.data[0].firstname);
            localStorage.setItem('userId', res.data[0].user_id);
            localStorage.setItem('token', token);
            console.log(token);
            this.router.navigate([`/user/${localStorage.getItem('userId')}`]);
            this.userSigningIn.next(false);
          } else {
            localStorage.setItem('user_role', res.data[0].user_role);
            localStorage.setItem('firstname', res.data[0].firstname);
            localStorage.setItem('token', token);
            this.router.navigate(['/admin']);
            this.userSigningIn.next(false);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getUserInfoById(userId: number) {
    return this.http
      .get(`http://localhost:5000/user/getUserById/${userId}`)
      .pipe(map((res: any) => res.data));
  }

  getAllUsers() {
    return this.http
      .get<User[]>('http://localhost:5000/user/getAllUsers')
      .pipe(map((res: any) => res.data));
  }

  goToSearchPage(search: string) {
    this.router.navigate(['search', search]);
  }

  searchForATour(search: string) {
    return this.http
      .get(`http://localhost:5000/tour/searchATour/${search}`)
      .pipe(map((res: any) => res.data));
  }

  getUsersCount() {
    return this.http.get<Number>(`http://localhost:5000/user/countUsers`);
  }

  sendMessageToBot(message: string) {
    this.messages.push({ type: 'user', message: message });
    this.http
      .post('http://localhost:5000/user/sendMessageToBot', { message })
      .subscribe({
        next: (res: any) => {
          this.messages.push({ type: 'bot', message: res.reply[0].answer });
          console.log(res);
          this.getBotMessages.next(this.messages);
        },
        error: (err) => console.log(err),
      });
  }
}
