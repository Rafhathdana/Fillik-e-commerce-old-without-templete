var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminControllers");
router.get("/", function (req, res, next) {
  res.render("admin/index", { title: "Express" });
});

router.get(
  "/login",
  (req, res, next) => {
    console.log("hai");
    next();
  },
  adminController.adminauth,
  adminController.getLogin
);
router.get("/home", adminController.verify, adminController.getHome);
router.get("/userList", adminController.verify, adminController.getUser);
router.get(
  "/merchantList",
  adminController.verify,
  adminController.getMerchant
);
router.get(
  "/addcategory",
  adminController.verify,
  adminController.getAddCategory
);
router.post(
  "/addcategory",
  adminController.verify,
  adminController.postAddCategory
);
router.post("/login", adminController.adminauth, adminController.postSignin);
router.get("/signup", adminController.adminauth, adminController.getSignUp);
router.post("/signup", adminController.adminauth, adminController.postSignup);

router.post(
  "/statusUserUpdate/:userId",
  adminController.verify,
  adminController.statusUserUpdate
);

router.post(
  "/statusMerchantUpdate/:userId",
  adminController.verify,
  adminController.statusMerchantUpdate
);

router.get("/logout", adminController.logout);

module.exports = router;
