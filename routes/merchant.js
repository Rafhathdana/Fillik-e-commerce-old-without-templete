var express = require("express");
var router = express.Router();
const merchantController = require("../controllers/merchantControllers");
const multer = require("multer");

router.get("/", merchantController.merchantauth, function (req, res, next) {
  res.render("merchant/index", {
    title: "merchant",
    merchantLoggedin: null,
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
router.get(
  "/home",
  merchantController.verify,
  merchantController.getProductList
);
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
router.get(
  "/addproduct",
  merchantController.verify,
  merchantController.getAddProduct
);
router.post("/addproduct", merchantController.postAddProduct);

router.get("/logout", merchantController.logout);

router.delete(
  "/deleteProduct/:Id",
  merchantController.verify,
  merchantController.deleteProduct
);
router.post(
  "/statusUpdateProduct/:userId",
  merchantController.verify,
  merchantController.statusProductUpdate
);
module.exports = router;
