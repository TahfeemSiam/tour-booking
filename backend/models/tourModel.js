class Tour {
  constructor(
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
    image4
  ) {
    this.tourname = tourname;
    this.price = price;
    this.start = start;
    this.end = end;
    this.location = location;
    this.description = description;
    this.search = search;
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;
    this.image4 = image4;
  }
}

module.exports = Tour;
