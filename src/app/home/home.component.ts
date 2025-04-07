import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TourComponent } from '../tour/tour.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { UserService } from '../user/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    TourComponent,
    AngularMaterialModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  userService = inject(UserService);
  message!: string;
  botReply!: Observable<any[]>;
  readonly panelOpenState = signal(false);

  ngOnInit() {
    this.botReply = this.userService.getBotMessages;
  }

  sendMessage() {
    this.userService.sendMessageToBot(this.message);
  }
}
