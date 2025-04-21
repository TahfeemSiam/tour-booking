const database = require("./../mysql");
const Contact = require("./../models/contactModel");
const manager = require("./../nlp");

exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";
  database.query(query, function (err, result) {
    if (err) throw err;
    res.status(201).json({
      message: "Fetched All Users Data",
      data: result,
    });
  });
};

exports.sendContactInfo = (req, res) => {
  const query =
    "INSERT INTO contact (fullname, email, phone, message) VALUES (?, ?, ?, ?)";
  const contact = new Contact(
    req.body.fullName,
    req.body.email,
    req.body.phone,
    req.body.message
  );
  database.query(
    query,
    [contact.fullname, contact.email, contact.phone, contact.message],
    function (err, result) {
      if (err) throw err;
      res.status(201).json({
        message: "Message Sent Successfully",
        data: result,
      });
    }
  );
};

exports.storeUserInfo = (req, res) => {
  const query =
    "INSERT INTO users (firstname, lastname, email, gender, user_role) VALUES (?, ?, ?, ?, ?)";
  database.query(
    query,
    [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.gender,
      req.body.user_role,
    ],
    function (err, result) {
      if (err) {
        return res.status(400).json({
          message: "Duplicate email",
        });
      }
      res.status(201).json({
        message: "User Record Created Successfully",
        data: result,
      });
    }
  );
};

exports.updateUserInfo = (req, res) => {
  const query =
    "UPDATE users SET firstname = ?, lastname = ?, email = ?, gender = ?, user_role = ? WHERE user_id = ?";
  database.query(
    query,
    [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.gender,
      "user",
      req.params.userId,
    ],
    function (err, result) {
      if (err) {
        return res.status(400).json({
          message: "User Info Update Failed",
        });
      }
      res.status(200).json({
        message: "User Info Updated Successfully",
        data: result,
      });
    }
  );
};

exports.cancelTourBooking = (req, res) => {
  const query = "DELETE FROM bookings WHERE tour_id = ?";
  database.query(query, [req.params.tourId], function (err, result) {
    if (err) {
      return res.status(400).json({
        message: "Booking Cancel Failed",
      });
    }
    res.status(200).json({
      message: "Booking Was Cancelled Successfully",
      data: result,
    });
  });
};

exports.getUserByEmail = (req, res) => {
  const query = "SELECT * FROM users WHERE email = ?";
  database.query(query, [req.params.email], function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Got User Successfully",
      data: result,
    });
  });
};

exports.getUserById = (req, res) => {
  const query = "SELECT * FROM users WHERE user_id = ?";
  database.query(query, [req.params.id], function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Got User Successfully",
      data: result,
    });
  });
};

exports.countUsers = (req, res) => {
  const query = "SELECT COUNT(user_id) AS NumberOfUsers FROM users;";
  database.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Number Of Users",
      data: result,
    });
  });
};

exports.sendMessageToBot = async (req, res) => {
  const response = await manager.process("en", req.body.message);
  console.log(response);

  res.status(200).json({
    message: "Message Recieved",
    reply: response.answers,
  });
};
