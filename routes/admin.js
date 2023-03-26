var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/products", (req, res, next) => {
  res.render("admin/productlist", { title: "Express" });
});
router.get("/addproduct", (req, res, next) => {
  res.render("admin/addproduct", { title: "Express" });
});
module.exports = router;
