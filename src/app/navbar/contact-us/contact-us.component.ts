import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from '../navbar.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-us',
  imports: [NavbarComponent, FormsModule, AngularMaterialModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  http = inject(HttpClient);
  readonly dialog = inject(MatDialog);
  sendingMessage = false;
  contactForm(form: NgForm) {
    this.sendingMessage = true;
    const { fullname, email, Phone, message } = form.form.value;
    const contact = new Contact(fullname, email, Phone, message);
    this.http.post('http://localhost:5000/user/contact', contact).subscribe({
      next: (res) => {
        // console.log(res);
        this.sendingMessage = false;

        const dialogRef = this.dialog.open(MessageSentDialog);

        dialogRef.afterClosed().subscribe(() => {
          console.log(`Dialog result: ${res}`);
          form.reset();
        });
      },
      error: (err) => {
        this.sendingMessage = false;
        console.log(err);
      },
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'messageSentDialog.html',
  imports: [MatDialogModule, AngularMaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageSentDialog {}
