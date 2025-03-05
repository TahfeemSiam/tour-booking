const database = require("./../mysql");
const Tour = require("./../models/tourModel");
var multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const { Jimp } = require("jimp");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`
    );
  },
});

const upload = multer({ storage: storage });
exports.upload = upload.any("image");

exports.imageUploaded = async (req, res, next) => {
  console.log(req.headers);
  try {
    if (req.headers.editoption == "contrast") {
      const image1 = await Jimp.read(req.files[0].path);
      const image2 = await Jimp.read(req.files[1].path);
      const image3 = await Jimp.read(req.files[2].path);
      const image4 = await Jimp.read(req.files[3].path);
      image1.resize({ w: 300, h: 300 });
      image2.resize({ w: 300, h: 300 });
      image3.resize({ w: 300, h: 300 });
      image4.resize({ w: 300, h: 300 });
      image1.contrast(0.25);
      image2.contrast(0.25);
      image3.contrast(0.25);
      image4.contrast(0.25);
      await image1.write(`src/assets/tour images/${req.files[0].filename}`);
      await image2.write(`src/assets/tour images/${req.files[1].filename}`);
      await image3.write(`src/assets/tour images/${req.files[2].filename}`);
      await image4.write(`src/assets/tour images/${req.files[3].filename}`);
      await unlinkAsync(req.files[0].path);
      await unlinkAsync(req.files[1].path);
      await unlinkAsync(req.files[2].path);
      await unlinkAsync(req.files[3].path);
      res.status(200).json({
        message: "Image Uploaded",
        img: req.files,
      });
    } else {
      const image1 = await Jimp.read(req.files[0].path);
      const image2 = await Jimp.read(req.files[1].path);
      const image3 = await Jimp.read(req.files[2].path);
      const image4 = await Jimp.read(req.files[3].path);
      image1.resize({ w: 300, h: 300 });
      image2.resize({ w: 300, h: 300 });
      image3.resize({ w: 300, h: 300 });
      image4.resize({ w: 300, h: 300 });
      await image1.write(`src/assets/tour images/${req.files[0].filename}`);
      await image2.write(`src/assets/tour images/${req.files[1].filename}`);
      await image3.write(`src/assets/tour images/${req.files[2].filename}`);
      await image4.write(`src/assets/tour images/${req.files[3].filename}`);
      await unlinkAsync(req.files[0].path);
      await unlinkAsync(req.files[1].path);
      await unlinkAsync(req.files[2].path);
      await unlinkAsync(req.files[3].path);
      res.status(200).json({
        message: "Image Uploaded",
        img: req.files,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "Upload Failed",
      err,
    });
  }
};

exports.createTour = (req, res) => {
  const tour = new Tour(
    req.body.tourname,
    req.body.price,
    req.body.start,
    req.body.end,
    req.body.location,
    req.body.description,
    req.body.search,
    req.body.image1,
    req.body.image2,
    req.body.image3,
    req.body.image4
  );
  const query =
    "INSERT INTO tours (tourname, price, start, end, location, description, search, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  database.query(
    query,
    [
      tour.tourname,
      tour.price,
      tour.start,
      tour.end,
      tour.location,
      tour.description,
      tour.search,
      tour.image1,
      tour.image2,
      tour.image3,
      tour.image4,
    ],
    function (err, result) {
      if (err) throw err;
      res.status(201).json({
        message: "Tour Record Created Successfully",
        data: result,
      });
    }
  );
};

exports.getAllTours = (req, res) => {
  const query = "SELECT * FROM tours";
  database.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Fetched All Tour Data Successfully",
      data: result,
    });
  });
};

exports.getTourById = (req, res) => {
  const query = "SELECT * FROM tours WHERE tour_id = ?";
  database.query(query, [req.params.id], function (err, result) {
    if (err) throw err;
    res.status(200).json({
      message: "Fetched All Tour Data Successfully",
      data: result,
    });
  });
};
