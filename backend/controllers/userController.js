const database = require("./../mysql");
const Contact = require("./../models/contactModel");
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
