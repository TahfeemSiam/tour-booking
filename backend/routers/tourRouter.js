const express = require("express");
const tourRouter = express.Router();
const tourController = require("../controllers/tourController");
tourRouter
  .route("/uploadImage")
  .post(tourController.upload, tourController.imageUploaded);
tourRouter.route("/createTour").post(tourController.createTour);
tourRouter.route("/getAllTours").get(tourController.getAllTours);
tourRouter.route("/getATour/:id").get(tourController.getTourById);

module.exports = tourRouter;
