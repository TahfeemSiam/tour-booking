const express = require("express");
const tourRouter = express.Router();
const tourController = require("../controllers/tourController");
tourRouter
  .route("/uploadImage")
  .post(tourController.upload, tourController.imageUploaded);

module.exports = tourRouter;
