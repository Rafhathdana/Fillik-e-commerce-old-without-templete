var express = require("express");
var router = express.Router();
const userconnect = require("../helpers/userconnect");
const otp = require("../helpers/otp");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/login", function (req, res, next) {
  res.render("user/login", { title: "Express" });
});
router.get("/signup", function (req, res, next) {
  res.render("user/signup", { title: "Express" });
});
router.post("/signup", (req, res, next) => {
  req.session.signupvalues = req.body;

  userconnect.doSignup(req.body).then((response) => {
    if (response.statuss) {
      res.redirect("/signin");
    }
  });
});
router.post("/sendotp", (req, res, next) => {
  console.log(req.body.mobile);
  req.session.otP = Math.floor(100000 + Math.random() * 900000);
  otp
    .OTP(req.body.mobile, req.session.otP)
    .then((response) => {
      response.success = true;
      res
        .status(200)
        .send({ response, success: true, message: "OTP Sent successfully" });
    })
    .catch((error) => {
      res.status(500).send({ success: false, message: "Error sending OTP" });
    });
});
router.get("/product", function (req, res, next) {
  res.render("user/productlist", { products });
});
module.exports = router;
