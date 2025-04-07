class Review {
  constructor(tour_id, firstname, review, date) {
    (this.tour_id = tour_id),
      (this.firstname = firstname),
      (this.review = review);
    this.date = date;
  }
}

module.exports = Review;
