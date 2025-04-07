export class Review {
  review_id: number;
  tour_id: number;
  firstname: string;
  review: string;
  date: Date;
  constructor(
    review_id: number,
    tour_id: number,
    firstname: string,
    review: string,
    date: Date
  ) {
    (this.review_id = review_id),
      (this.tour_id = tour_id),
      (this.firstname = firstname),
      (this.review = review),
      (this.date = date);
  }
}
