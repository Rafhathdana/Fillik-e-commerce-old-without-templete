var express = require("express");
var router = express.Router();
const superAdminController = require("../controllers/superAdminControllers");
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

router.get(
  "/login",
  superAdminController.superAdminauth,
  superAdminController.getLogin
);
router.get("/home", superAdminController.verify, superAdminController.getHome);
router.post(
  "/login",
  superAdminController.superAdminauth,
  adminController.postSignin
);
module.exports = router;
