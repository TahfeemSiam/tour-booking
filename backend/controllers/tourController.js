var multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/tour images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`
    );
    console.log(file);
  },
});

const upload = multer({ storage: storage });
exports.upload = upload.any("image");

exports.imageUploaded = (req, res, next) => {
  console.log(req.files);
  res.status(200).json({
    message: "Image Uploaded",
    img: req.files,
  });
};
