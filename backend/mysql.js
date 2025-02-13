var mysql = require("mysql");

var database = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "tour_book",
  password: "",
});

database.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = database;
