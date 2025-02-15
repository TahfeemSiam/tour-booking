const express = require("express");
const server = express();
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const userRouter = require("./routers/userRouter");
const tourRouter = require("./routers/tourRouter");
server.use(express.json());
server.use(cors());

server.use("/user", userRouter);
server.use("/tour", tourRouter);

server.post("/verify", (req, res) => {
  const token = req.headers.token;
  try {
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          "676609031384-c8fqa75gfbunjkf4iq37oh2ig1q42gg3.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      res.status(200).json({
        message: "Valid Token",
        id_token: token,
        user_id: userid,
      });
    }
    verify();
  } catch (err) {
    res.status(400).json({
      message: "Invalid Token",
      error: err,
    });
  }
});

server.listen(5000, (req, res) => {
  console.log("Server Has Started");
});
