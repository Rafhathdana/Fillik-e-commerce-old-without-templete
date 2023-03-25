var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
  res.render("superadmin/index", { title: "Express" });
});
router.get("/login", function (req, res, next) {
  res.render("superadmin/login", { title: "Express" });
});
router.get("/brands", (req, res, next) => {
  res.render("superadmin/admins", { title: "Express" });
});
router.get("/users", (req, res, next) => {
  res.render("superadmin/users", { title: "Express" });
});
module.exports = router;
