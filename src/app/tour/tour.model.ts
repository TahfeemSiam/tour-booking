export class Tour {
  tour_id: number;
  tourname: string;
  price: number;
  start: Date;
  end: Date;
  location: string;
  description: string;
  search: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  constructor(
    tour_id: number,
    tourname: string,
    price: number,
    start: Date,
    end: Date,
    location: string,
    description: string,
    search: string,
    image1: string,
    image2: string,
    image3: string,
    image4: string
  ) {
    this.tour_id = tour_id;
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
