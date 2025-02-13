import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-register',
  imports: [
    NavbarComponent,
    RouterModule,
    AngularMaterialModule,
    GoogleSigninButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: SocialAuthService) {}
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      console.log(user);
      //perform further logics
    });
  }
}
