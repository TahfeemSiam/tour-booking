import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    NavbarComponent,
    RouterModule,
    AngularMaterialModule,
    GoogleSigninButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: SocialAuthService,
    private http: HttpClient
  ) {}
  token!: string;
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.token = user.idToken;
      console.log(user);
      console.log(this.token);
      console.log(document.cookie);
      const httpHeaders: HttpHeaders = new HttpHeaders({
        token: this.token,
      });
      this.http
        .post('http://localhost:5000/verify', {}, { headers: httpHeaders })
        .subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err),
        });
    });
  }
}
