var express = require("express");
var router = express.Router();
const userController = require("../controllers/adminControllers");
function adminauth(req, res, next) {
  if (req.session.admin.loggedIn) {
    res.redirect("/home");
  } else {
    next();
  }
}
function verify(req, res, next) {
  if (req.session.admin.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
}
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/signup", adminauth, function (req, res, next) {
  res.render("admin/signup", {
    title: "admin",
    err_msg: req.session.adminerrmsg,
  });
  req.session.errmsg = null;
});
router.get("/login", adminauth, function (req, res, next) {
  res.render("admin/login", {
    title: "admin",
    err_msg: req.session.adminerrmsg,
  });
  req.session.errmsg = null;
});
router.get("/home", function (req, res, next) {
  res.render("admin/productlist", { products });
});
router.post("/signup", adminauth, adminController.postSignup);
router.post("/login", adminauth, adminController.postSignin);
/* GET admins listing. */
router.get("/products", (req, res, next) => {
  res.render("admin/productlist", { title: "Express" });
});
router.get("/addproduct", (req, res, next) => {
  res.render("admin/addproduct", { title: "Express" });
});
module.exports = router;
