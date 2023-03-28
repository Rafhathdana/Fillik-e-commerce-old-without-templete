var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminControllers");

router.get("/", adminController.adminauth, function (req, res, next) {
  res.render("admin/index", {
    title: "admin",
    loggedin: false,
  });
});
router.get("/signup", adminController.adminauth, adminController.getSignIn);
router.get("/login", adminController.adminauth, adminController.getLogin);
router.get("/home", adminController.verify, adminController.getHome);
router.post("/signup", adminController.adminauth, adminController.postSignup);
router.post("/login", adminController.adminauth, adminController.postSignin);
/* GET admins listing. */
router.get("/products", (req, res, next) => {
  res.render("admin/productlist", { title: "Express" });
});
router.get("/addproduct", (req, res, next) => {
  res.render("admin/addproduct", {
    title: "product",
    brandName: req.session.admin.brandName,
    loggedin: req.session.AdminloggedIn,
  });
});
router.post("/addproduct", (req, res, next) => {
  res.render("admin/addproduct", {
    title: "product",
    brandName: req.session.admin.brandName,
    loggedin: req.session.AdminloggedIn,
  });
});

router.get("/logout", adminController.logout);
module.exports = router;
