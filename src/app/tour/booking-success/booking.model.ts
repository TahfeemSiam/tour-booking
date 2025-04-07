export class TourBooking {
  tour_id: number;
  tourname: string;
  user_id: number;
  price: number;
  constructor(
    tour_id: number,
    tourname: string,
    userId: number,
    price: number
  ) {
    this.tour_id = tour_id;
    this.tourname = tourname;
    this.user_id = userId;
    this.price = price;
  }
}
