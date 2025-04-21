const express = require("express");
const tourRouter = express.Router();
const tourController = require("../controllers/tourController");
tourRouter
  .route("/uploadImage")
  .post(tourController.upload, tourController.imageUploaded);
tourRouter.route("/createTour").post(tourController.createTour);
tourRouter.route("/getAllTours").get(tourController.getAllTours);
tourRouter.route("/getATour/:id").get(tourController.getTourById);
tourRouter.route("/searchATour/:search").get(tourController.searchForTour);
tourRouter.route("/createAReview").post(tourController.createTourReview);
tourRouter
  .route("/getReviewByTourId/:id")
  .get(tourController.getATourReviewById);
tourRouter.route("/stripe/:id").post(tourController.makePayment);
tourRouter
  .route("/paymentWithSslCommerz/:id/:amount/:name")
  .get(tourController.makePaymentUsingSslCommerz);

tourRouter.route("/storeBooking").post(tourController.storeBookings);
tourRouter.route("/email").get(tourController.sendConfirmationEmail);
tourRouter
  .route("/getBookingsByUserId/:userId")
  .get(tourController.getBookingsByUserId);

tourRouter.route("/countTours").get(tourController.countTours);
tourRouter.route("/countBookings").get(tourController.countBookings);

module.exports = tourRouter;
