var express = require("express");
var router = express.Router();
const userController = require("../controllers/userControllers");
const otp = require("../controllers/otp");
const multer = require("multer");

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
  res.render("index", { title: "Express", loggedin: false });
});
router.get("/signup", userauth, function (req, res, next) {
  res.render("user/signup", {
    title: "user",
    err_msg: req.session.errmsg,
    loggedin: false,
  });
  req.session.errmsg = null;
});
router.get("/login", userauth, function (req, res, next) {
  res.render("user/login", {
    title: "user",
    err_msg: req.session.errmsg,
    loggedin: false,
  });
  req.session.errmsg = null;
});
router.get("/home", function (req, res, next) {
  res.render("user/productlist", {
    loggedin: req.session.userLoggedIn,
    user: req.session.user,
  });
});
router.get("/productlist/:productname", (req, res, next) => {
  res.render("user/productlist", {
    loggedin: false,
  });
});
router.get("/productview", (req, res, next) => {
  res.render("user/productView", { loggedin: false });
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("images"), function (req, res) {
  console.log(req.files);
  res.send("Images uploaded!");
});
router.get("/upload", upload.array("images"), function (req, res) {
  res.render("merchant/images", {
    title: "user",
    err_msg: req.session.errmsg,
    loggedin: false,
  });
});
module.exports = router;
