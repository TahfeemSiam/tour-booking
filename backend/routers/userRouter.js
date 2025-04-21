const express = require("express");
const userRouter = express.Router();
const userController = require("./../controllers/userController");

userRouter.route("/getAllUsers").get(userController.getAllUsers);
userRouter.route("/contact").post(userController.sendContactInfo);
userRouter.route("/register").post(userController.storeUserInfo);
userRouter
  .route("/updateUserInfo/:userId")
  .patch(userController.updateUserInfo);
userRouter
  .route("/cancelBooking/:tourId")
  .delete(userController.cancelTourBooking);
userRouter.route("/getUserByEmail/:email").get(userController.getUserByEmail);
userRouter.route("/getUserById/:id").get(userController.getUserById);
userRouter.route("/sendMessageToBot").post(userController.sendMessageToBot);
userRouter.route("/countUsers").get(userController.countUsers);
module.exports = userRouter;
