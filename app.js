var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
dotenv.config();

var indexRouter = require("./routes/index");
var uploadRouter = require("./routes/upload");

var usersRouter = require("./routes/user");
const eventsRouter = require("./routes/event");

var app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.all(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const mongo_uri =
  "mongodb+srv://evemark:evemark1234@cluster0.g3yelbg.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose.connect(mongo_uri, function (err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});
app.use("/", indexRouter);
app.use("/upload", uploadRouter);

app.use("/user", usersRouter);
app.use("/event", eventsRouter);

module.exports = app;
