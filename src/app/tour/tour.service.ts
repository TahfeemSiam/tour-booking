import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tour } from './tour.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  http = inject(HttpClient);
  getAllTours() {
    return this.http
      .get<Tour[]>('http://localhost:5000/tour/getAllTours')
      .pipe(map((res: any) => res.data));
  }

  getATour(tourId: number) {
    return this.http
      .get<Tour[]>(`http://localhost:5000/tour/getATour/${tourId}`)
      .pipe(map((res: any) => res.data));
  }
}
