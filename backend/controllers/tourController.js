const database = require("./../mysql");
const Tour = require("./../models/tourModel");
const Review = require("../models/reviewModel");
const stripe = require("stripe")(
  "sk_test_51NPlrWDD1NVJPDTvAMdKy8Fxiq7F8I4kC2gVZFHcA3JszTS0lozpgNdwbsgnOIT7VyNhSjDSCAU1BHKm40CnpTws00uQcSneIh"
);
const nodemailer = require("nodemailer");
const SSLCommerzPayment = require("sslcommerz-lts");
var multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const { Jimp } = require("jimp");
const TourBooking = require("../models/bookingModel");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`
    );
  },
});

const upload = multer({ storage: storage });
exports.upload = upload.any("image");

exports.imageUploaded = async (req, res, next) => {
  console.log(req.headers);
  try {
    if (req.headers.editoption == "contrast") {
      const image1 = await Jimp.read(req.files[0].path);
      const image2 = await Jimp.read(req.files[1].path);
      const image3 = await Jimp.read(req.files[2].path);
      const image4 = await Jimp.read(req.files[3].path);
      image1.resize({ w: 300, h: 300 });
      image2.resize({ w: 300, h: 300 });
      image3.resize({ w: 300, h: 300 });
      image4.resize({ w: 300, h: 300 });
      image1.contrast(0.25);
      image2.contrast(0.25);
      image3.contrast(0.25);
      image4.contrast(0.25);
      await image1.write(`src/assets/tour images/${req.files[0].filename}`);
      await image2.write(`src/assets/tour images/${req.files[1].filename}`);
      await image3.write(`src/assets/tour images/${req.files[2].filename}`);
      await image4.write(`src/assets/tour images/${req.files[3].filename}`);
      await unlinkAsync(req.files[0].path);
      await unlinkAsync(req.files[1].path);
      await unlinkAsync(req.files[2].path);
      await unlinkAsync(req.files[3].path);
      res.status(200).json({
        message: "Image Uploaded",
        img: req.files,
      });
    } else {
      const image1 = await Jimp.read(req.files[0].path);
      const image2 = await Jimp.read(req.files[1].path);
      const image3 = await Jimp.read(req.files[2].path);
      const image4 = await Jimp.read(req.files[3].path);
      image1.resize({ w: 300, h: 300 });
      image2.resize({ w: 300, h: 300 });
      image3.resize({ w: 300, h: 300 });
      image4.resize({ w: 300, h: 300 });
      await image1.write(`src/assets/tour images/${req.files[0].filename}`);
      await image2.write(`src/assets/tour images/${req.files[1].filename}`);
      await image3.write(`src/assets/tour images/${req.files[2].filename}`);
      await image4.write(`src/assets/tour images/${req.files[3].filename}`);
      await unlinkAsync(req.files[0].path);
      await unlinkAsync(req.files[1].path);
      await unlinkAsync(req.files[2].path);
      await unlinkAsync(req.files[3].path);
      res.status(200).json({
        message: "Image Uploaded",
        img: req.files,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "Upload Failed",
      err,
    });
  }
};

exports.createTour = (req, res) => {
  const tour = new Tour(
    req.body.tourname,
    req.body.price,
    req.body.start,
    req.body.end,
    req.body.location,
    req.body.description,
    req.body.search,
    req.body.image1,
    req.body.image2,
    req.body.image3,
    req.body.image4
  );
  const query =
    "INSERT INTO tours (tourname, price, start, end, location, description, search, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  database.query(
    query,
    [
      tour.tourname,
      tour.price,
      tour.start,
      tour.end,
      tour.location,
      tour.description,
      tour.search,
      tour.image1,
      tour.image2,
      tour.image3,
      tour.image4,
    ],
    function (err, result) {
      if (err) throw err;
      res.status(201).json({
        message: "Tour Record Created Successfully",
        data: result,
      });
    }
  );
};

exports.getAllTours = (req, res) => {
  const query = "SELECT * FROM tours";
  database.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Fetched All Tour Data Successfully",
      data: result,
    });
  });
};

exports.getTourById = (req, res) => {
  const query = "SELECT * FROM tours WHERE tour_id = ?";
  database.query(query, [req.params.id], function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Fetched All Tour Data Successfully",
      data: result,
    });
  });
};

exports.searchForTour = (req, res) => {
  const query = "SELECT * FROM tours WHERE search LIKE ?";
  const searchValue = `%${req.params.search}%`;
  database.query(query, [searchValue], function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Fetched All Tour Data Successfully",
      data: result,
    });
  });
};

exports.countTours = (req, res) => {
  const query = "SELECT COUNT(tour_id) AS NumberOfTours FROM tours;";
  database.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Number Of Tours",
      data: result,
    });
  });
};

exports.createTourReview = (req, res) => {
  const query =
    "INSERT INTO reviews (tour_id, firstname, review, date) VALUES (?, ?, ?, CURRENT_DATE())";
  const review = new Review(
    req.body.tour_id,
    req.body.firstname,
    req.body.review,
    Date.now()
  );
  database.query(
    query,
    [review.tour_id, review.firstname, review.review],
    function (err, result) {
      if (err) throw err;
      res.status(201).json({
        message: "Tour Review Created Successfully",
        data: result,
      });
    }
  );
};

exports.getATourReviewById = (req, res) => {
  const query = "SELECT * FROM reviews WHERE tour_id = ?";
  database.query(query, [req.params.id], function (err, result) {
    if (err) throw err;
    res.status(201).json({
      message: "Fetched Tour Review Successfully",
      data: result,
    });
  });
};

exports.makePayment = async (req, res) => {
  //get amount
  const amount = req.body.price;
  const tourName = req.body.tourname;
  const userId = req.body.user_id;
  const tourId = req.params.id;
  // const img = req.body.img;
  try {
    //create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: tourName,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:4200/success/${tourId}/${userId}/${tourName}/${amount}`,
      cancel_url: "http://localhost:4200",
      expand: ["payment_intent"],
    });
    return res.status(200).json({
      message: "Payment Was Successfull",
      session,
    });
  } catch (err) {
    res.status(404).json({
      message: "Something went wrong",
      err,
    });
    console.log("stripe error", err);
  }
};

exports.makePaymentUsingSslCommerz = (req, res) => {
  const amount = req.params.amount;
  const tourName = req.params.name;
  const data = {
    total_amount: amount,
    currency: "USD",
    tran_id: "REF123", // use unique tran_id for each api call
    success_url: `http://localhost:4200/detail/${req.params.id}`,
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: tourName,
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(
    "desht67dd498e9e027",
    "desht67dd498e9e027@ssl",
    false
  );
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.status(200).json({
      message: "Going to payment page",
      url: GatewayPageURL,
    });
  });
};

exports.storeBookings = (req, res) => {
  const query =
    "INSERT INTO bookings (tour_id, user_id, tourname, price) VALUES (?, ?, ?, ?)";
  const tourBooking = new TourBooking(
    req.body.tour_id,
    req.body.user_id,
    req.body.tourname,
    req.body.price
  );
  database.query(
    query,
    [
      tourBooking.tour_id,
      tourBooking.user_id,
      tourBooking.tourname,
      tourBooking.price,
    ],
    function (err, result) {
      if (err) throw err;
      res.status(201).json({
        message: "Tour Booking Created Successfully",
        data: result,
      });
    }
  );
};

exports.sendConfirmationEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "",
      pass: "",
    },
  });
  try {
    const info = await transporter.sendMail({
      from: '"Tour Admin" <>',
      to: "",
      subject: "Tour Booking Confirmed 📩",
      text: "Your payment was made successfully and your tour booking has been confirmed",
    });

    res.status(200).json({
      message: "Email Sent",
      info: info.messageId,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      err,
    });
  }
};

exports.countBookings = (req, res) => {
  const query = "SELECT COUNT(booking_id) AS NumberOfBookings FROM bookings;";
  database.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Number Of Bookings",
      data: result,
    });
  });
};

exports.getBookingsByUserId = (req, res) => {
  const query = "SELECT * FROM bookings WHERE user_id = ?";
  database.query(query, [req.params.userId], function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Fetched Tour Bookings",
      data: result,
    });
  });
};
