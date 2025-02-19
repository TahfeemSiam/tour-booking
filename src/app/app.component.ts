import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'tour-booking';
  ngOnInit(): void {
    // localStorage.removeItem('token');
    // localStorage.removeItem('user_role');
    // localStorage.removeItem('firstname');
    // localStorage.removeItem('lastname');
  }
}
