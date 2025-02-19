const database = require("./../mysql");
const Contact = require("./../models/contactModel");

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
      if (err) throw err;
      res.status(201).json({
        message: "User Record Created Successfully",
        data: result,
      });
    }
  );
};

exports.getUserByEmail = (req, res) => {
  const query = "SELECT firstname, user_role FROM users WHERE email = ?";
  database.query(query, [req.params.email], function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Got User Successfully",
      data: result,
    });
  });
};
