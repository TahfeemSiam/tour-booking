const express = require("express");
const userRouter = express.Router();
const userController = require("./../controllers/userController");

userRouter.route("/getAllUsers").get(userController.getAllUsers);
userRouter.route("/contact").post(userController.sendContactInfo);
userRouter.route("/register").post(userController.storeUserInfo);
userRouter.route("/getUserByEmail/:email").get(userController.getUserByEmail);

module.exports = userRouter;
