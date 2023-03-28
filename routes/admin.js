var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminControllers");
router.get("/", function (req, res, next) {
  res.render("admin/index", { title: "Express" });
});

router.get("/brands", (req, res, next) => {
  res.render("admin/admins", { title: "Express" });
});

router.get("/login", adminController.adminauth, adminController.getLogin);
router.get("/home", adminController.verify, adminController.getHome);
router.get(
  "/addcategory",
  adminController.verify,
  adminController.getAddCatagory
);
router.post("/login", adminController.adminauth, adminController.postSignin);
router.get("/signup", adminController.adminauth, adminController.getSignUp);
router.post("/signup", adminController.adminauth, adminController.postSignup);

router.post(
  "/statusUpdate/:userId",
  (req, res, next) => {
    console.log("hai");
    next();
  },
  adminController.verify,
  adminController.statusUpdate
);

router.get("/logout", adminController.logout);

module.exports = router;
