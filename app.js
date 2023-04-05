var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const app = express();

var usersRouter = require("./routes/user");
var merchantRouter = require("./routes/merchant");
var adminRouter = require("./routes/admin");
const multer = require("multer");

var db = require("./config/connection");
// view engine setup
const mongoose = require("mongoose");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "Key", cookie: { maxAge: 6000000 } }));
db.connect((err) => {
  if (err) console.log("Connection Error" + err);
});
app.use("/", usersRouter);
app.use("/merchant/", merchantRouter);
app.use("/admin/", adminRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view cache", false);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
