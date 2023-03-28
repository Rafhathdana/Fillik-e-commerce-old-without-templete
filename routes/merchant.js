var express = require("express");
var router = express.Router();
const merchantController = require("../controllers/merchantControllers");

router.get("/", merchantController.merchantauth, function (req, res, next) {
  res.render("merchant/index", {
    title: "merchant",
    loggedin: false,
  });
});
router.get(
  "/signup",
  merchantController.merchantauth,
  merchantController.getSignIn
);
router.get(
  "/login",
  merchantController.merchantauth,
  merchantController.getLogin
);
router.get("/home", merchantController.verify, merchantController.getHome);
router.post(
  "/signup",
  merchantController.merchantauth,
  merchantController.postSignup
);
router.post(
  "/login",
  merchantController.merchantauth,
  merchantController.postSignin
);
/* GET merchants listing. */
router.get("/products", (req, res, next) => {
  res.render("merchant/productlist", { title: "Express" });
});
router.get("/addproduct", (req, res, next) => {
  res.render("merchant/addproduct", {
    title: "product",
    brandName: req.session.merchant.brandName,
    loggedin: req.session.merchantloggedIn,
  });
});
router.post("/addproduct", (req, res, next) => {});

router.get("/logout", merchantController.logout);
module.exports = router;
