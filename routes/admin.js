var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminControllers");
router.get("/", adminController.adminauth, adminController.getLogin);

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
router.get(
  "/viewcategory",
  adminController.verify,
  adminController.getViewCategory
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
router.delete(
  "/deleteCategory/:Id",
  adminController.verify,
  adminController.deleteCategory
);
router.post(
  "/statusMerchantUpdate/:userId",
  adminController.verify,
  adminController.statusMerchantUpdate
);

router.get("/logout", adminController.logout);

module.exports = router;
