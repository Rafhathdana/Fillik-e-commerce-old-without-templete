var express = require("express");
var router = express.Router();
const userController = require("../controllers/userControllers");
const otp = require("../controllers/otp");

/* GET home page. */
function userauth(req, res, next) {
  if (req.session && req.session.user && req.session.userLoggedIn) {
    res.redirect("/home");
  } else {
    next();
  }
}
function verify(req, res, next) {
  if (req.session && req.session.user && req.session.userLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
}
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/signup", userauth, function (req, res, next) {
  res.render("user/signup", { title: "user", err_msg: req.session.errmsg });
  req.session.errmsg = null;
});
router.get("/login", userauth, function (req, res, next) {
  res.render("user/login", { title: "user", err_msg: req.session.errmsg });
  req.session.errmsg = null;
});
router.get("/home", function (req, res, next) {
  res.render("user/productlist", { products });
});
router.post("/signup", userauth, userController.postSignup);
router.post("/login", userauth, userController.postSignin);
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
router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});
module.exports = router;
