const express = require("express");
const userRouter = express.Router();
const userController = require("./../controllers/userController");

userRouter.route("/contact").post(userController.sendContactInfo);
userRouter.route("/register").post(userController.storeUserInfo);

module.exports = userRouter;
