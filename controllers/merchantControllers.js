var Merchant = require("../models/merchantSchema");
const bcrypt = require("bcrypt");
const { response } = require("../app");
module.exports = {
  merchantauth: (req, res, next) => {
    if (req.session && req.session.merchant && req.session.merchantLoggedIn) {
      res.redirect("/merchant/home");
    } else {
      next();
    }
  },
  verify: (req, res, next) => {
    if (req.session && req.session.merchant && req.session.merchantLoggedIn) {
      console.log(req.session.merchantLoggedIn);
      next();
    } else {
      res.redirect("/merchant/login");
    }
  },
  getLogin: (req, res, next) => {
    res.render("merchant/login", {
      title: "merchant",
      err_msg: req.session.merchanterrmsg,
      loggedin: false,
    });
    req.session.errmsg = null;
  },
  getSignIn: (req, res, next) => {
    res.render("merchant/signup", {
      title: "merchant",
      err_msg: req.session.merchanterrmsg,
      loggedin: false,
    });
    req.session.errmsg = null;
  },
  getHome: (req, res, next) => {
    res.render("merchant/productlist", {
      title: "product",
      brandName: req.session.merchant.brandName,
      loggedin: req.session.merchantLoggedIn,
    });
  },
  postSignup: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newMerchant = new Merchant({
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
      Merchant.create(newMerchant);
      console.log(newMerchant);
      res.redirect("/merchant/login");
    } catch (error) {
      console.log(error);
      res.redirect("/merchant/signup");
    }
  },
  postSignin: async (req, res) => {
    try {
      const newMerchant = await Merchant.findOne({ email: req.body.email });
      console.log(newMerchant);
      if (newMerchant) {
        bcrypt
          .compare(req.body.password, newMerchant.password)
          .then((status) => {
            console.log("hai");
            if (status) {
              console.log("user exist");
              req.session.merchant = newMerchant;
              req.session.merchantLoggedIn = true;
              console.log(newMerchant);
              res.redirect("/merchant/home");
            } else {
              console.log("password is not matching");
              req.session.errmsg = "Invalid Username or Password";
              res.status(400).redirect("/merchant/login");
            }
          });
      } else {
        req.session.errmsg = "Invalid Username or Password";
        res.status(400).redirect("/merchant/login");
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
