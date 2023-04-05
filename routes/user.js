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
router.get("/", userauth, function (req, res, next) {
  res.render("index", { title: "Express", loggedin: false });
});
router.get("/signup", userauth, function (req, res, next) {
  res.render("user/signup2", {
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
router.get("/home", verify, userController.getProductlist);
router.get(
  "/productlist",
  userController.getFilter,
  userController.productFilterList
);
router.get("/product", userController.productFilterList);
router.get("/productview/:productId", userController.getProductView);
router.post("/signup", userauth, userController.postSignup);
router.post("/login", userauth, userController.postSignin);
router.post("/sendotp", userController.sendOtp);
router.post("/verifyotp", userController.verifyOtp);
router.get("/logout", userController.logout);

module.exports = router;
