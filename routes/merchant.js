var express = require("express");
var router = express.Router();
const merchantController = require("../controllers/merchantControllers");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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
router.get(
  "/addproduct",
  merchantController.verify,
  merchantController.getAddProduct
);
router.post(
  "/addproduct",
  upload.array("images"),
  merchantController.postAddProduct
);

router.get("/logout", merchantController.logout);

router.get("/upload", upload.array("images"), function (req, res) {
  res.render("merchant/images", {
    title: "user",
    err_msg: req.session.errmsg,
    loggedin: false,
  });
});

module.exports = router;
