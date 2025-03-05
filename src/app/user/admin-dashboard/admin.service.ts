import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subject } from 'rxjs';
import { Tour } from '../../tour/tour.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  http = inject(HttpClient);
  creatingTour = new Subject<boolean>();

  tourImageUpload(form: NgForm, formData: FormData) {
    this.creatingTour.next(true);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      editOption: form.form.value.imageEdit,
    });
    this.http
      .post('http://localhost:5000/tour/uploadImage', formData, {
        headers: httpHeaders,
      })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          console.log(res.img[0].filename);
          console.log(res.img[1].filename);
          console.log(res.img[2].filename);
          console.log(res.img[3].filename);
          form.form.value.image1 = res.img[0].filename;
          form.form.value.image2 = res.img[1].filename;
          form.form.value.image3 = res.img[2].filename;
          form.form.value.image4 = res.img[3].filename;
          console.log(form.form.value);
          this.createtour(form);
        },
        error: (err) => console.log(err),
      });
  }

  createtour(form: NgForm) {
    const {
      tourname,
      price,
      start,
      end,
      location,
      description,
      search,
      image1,
      image2,
      image3,
      image4,
    } = form.form.value;
    this.http
      .post('http://localhost:5000/tour/createTour', {
        tourname,
        price,
        start,
        end,
        location,
        description,
        search,
        image1,
        image2,
        image3,
        image4,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.creatingTour.next(false);
          form.reset();
        },
        error: (err) => console.log(err),
      });
  }
}
