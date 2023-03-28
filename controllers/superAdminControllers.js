var SuperAdmin = require("../models/superAdminSchema");
const bcrypt = require("bcrypt");
const { response } = require("../app");
module.exports = {
  adminauth: (req, res, next) => {
    if (
      req.session &&
      req.session.superadmin &&
      req.session.SuperAdminloggedIn
    ) {
      res.redirect("/superadmin/home");
    } else {
      next();
    }
  },
  verify: (req, res, next) => {
    console.log("13333 ", req.session.SuperAdminloggedIn);
    if (
      req.session &&
      req.session.superadmin &&
      req.session.SuperAdminloggedIn
    ) {
      console.log(req.session.SuperAdminloggedIn);
      next();
    } else {
      res.redirect("/superadmin/login");
    }
  },
  getHome: (req, res, next) => {
    res.render("admin/productlist", {
      title: "product",
      brandName: req.session.superadmin.brandName,
      loggedin: req.session.SuperAdminloggedIn,
    });
  },
  getLogin: (req, res, next) => {
    res.render("admin/login", {
      title: "admin",
      err_msg: req.session.superadminerrmsg,
      loggedin: false,
    });
    req.session.errmsg = null;
  },
  postSignin: async (req, res) => {
    try {
      const newAdmin = await SuperAdmin.findOne({ email: req.body.email });
      if (newAdmin) {
        bcrypt.compare(req.body.password, newAdmin.password).then((status) => {
          if (status) {
            console.log("user exist");
            req.session.superadmin = newAdmin;
            req.session.SuperAdminloggedIn = true;
            console.log(newAdmin);
            res.redirect("/superadmin/home");
          } else {
            console.log("password is not matching");
            req.session.errmsg = "Invalid Username or Password";
            res.status(400).redirect("/superadmin/login");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  logout: (req, res) => {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  },
};
