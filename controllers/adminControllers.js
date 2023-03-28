var Admin = require("../models/adminSchema");
const bcrypt = require("bcrypt");
const { response } = require("../app");
module.exports = {
  adminauth: (req, res, next) => {
    if (req.session && req.session.admin && req.session.AdminloggedIn) {
      res.redirect("/merchant/home");
    } else {
      next();
    }
  },
  verify: (req, res, next) => {
    console.log("13333 ", req.session.AdminloggedIn);
    if (req.session && req.session.admin && req.session.AdminloggedIn) {
      console.log(req.session.AdminloggedIn);
      next();
    } else {
      res.redirect("/merchant/login");
    }
  },
  getHome: (req, res, next) => {
    res.render("admin/productlist", {
      title: "product",
      brandName: req.session.admin.brandName,
      loggedin: req.session.AdminloggedIn,
    });
  },
  getLogin: (req, res, next) => {
    res.render("admin/login", {
      title: "admin",
      err_msg: req.session.adminerrmsg,
      loggedin: false,
    });
    req.session.errmsg = null;
  },
  getSignIn: (req, res, next) => {
    res.render("admin/signup", {
      title: "admin",
      err_msg: req.session.adminerrmsg,
      loggedin: false,
    });
    req.session.errmsg = null;
  },
  postSignup: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newAdmin = new Admin({
        brandName: req.body.brandName,
        outletName: req.body.outletName,
        regNumber: req.body.regNumber,
        regNumber: req.body.regNumber,
        email: req.body.email,
        gpsCoordinates: req.body.gpsCoordinates,
        pin: req.body.pin,
        productlist: [],
        password: hashedPassword,
        mobile: req.body.mobile,
        status: false,
        emailverified: false,
        mobileverification: true,
        isActive: true,
      });
      Admin.create(newAdmin);
      console.log(newAdmin);
      res.redirect("/merchant/login");
    } catch (error) {
      console.log(error);
      res.redirect("/merchant/signup");
    }
  },
  postSignin: async (req, res) => {
    try {
      const newAdmin = await Admin.findOne({ email: req.body.email });
      if (newAdmin) {
        bcrypt.compare(req.body.password, newAdmin.password).then((status) => {
          if (status) {
            console.log("user exist");
            req.session.admin = newAdmin;
            req.session.AdminloggedIn = true;
            console.log(newAdmin);
            res.redirect("/merchant/home");
          } else {
            console.log("password is not matching");
            req.session.errmsg = "Invalid Username or Password";
            res.status(400).redirect("/merchant/login");
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
