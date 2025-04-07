class TourBooking {
  constructor(tour_id, user_id, tourname, price) {
    (this.tour_id = tour_id),
      (this.user_id = user_id),
      (this.tourname = tourname),
      (this.price = price);
  }
}

module.exports = TourBooking;
