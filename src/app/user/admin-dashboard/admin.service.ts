import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  http = inject(HttpClient);

  tourImageUpload(form: NgForm, formData: FormData) {
    this.http
      .post('http://localhost:5000/tour/uploadImage', formData)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          console.log(res.img[0].filename);
          console.log(res.img[1].filename);
          console.log(res.img[2].filename);
          console.log(res.img[3].filename);
          form.form.value.image = res.img[0].filename;
          form.form.value.image2 = res.img[1].filename;
          form.form.value.image3 = res.img[2].filename;
          form.form.value.image4 = res.img[3].filename;
          console.log(form.form.value);
          form.reset();
        },
        error: (err) => console.log(err),
      });
  }
}
