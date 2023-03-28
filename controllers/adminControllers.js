var SuperAdmin = require("../models/merchantSchema");
var users = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { response } = require("../app");
module.exports = {
  adminauth: (req, res, next) => {
    if (req.session && req.session.admin && req.session.SuperAdminloggedIn) {
      res.redirect("/admin/home");
    } else {
      next();
    }
  },
  verify: (req, res, next) => {
    if (req.session && req.session.admin && req.session.SuperAdminloggedIn) {
      console.log(req.session.SuperAdminloggedIn);
      next();
    } else {
      res.redirect("/admin/login");
    }
  },
  getHome: async (req, res, next) => {
    const userslist = await users.find().limit(10);
    res.render("admin/users", {
      title: "users",
      fullName: req.session.admin.fullName,
      loggedin: req.session.SuperAdminloggedIn,
      userslist,
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
  postSignin: async (req, res) => {
    try {
      const newSuperAdmin = await SuperAdmin.findOne({ email: req.body.email });
      console.log(req.body.email);
      if (newSuperAdmin) {
        bcrypt
          .compare(req.body.password, newSuperAdmin.password)
          .then((status) => {
            if (status) {
              console.log("user exist");
              req.session.admin = newSuperAdmin;
              req.session.SuperAdminloggedIn = true;
              console.log(newSuperAdmin);
              res.redirect("/admin/home");
            } else {
              console.log("password is not matching");
              req.session.errmsg = "Invalid Username or Password";
              res.status(400).redirect("/admin/login");
            }
          });
      } else {
        req.session.errmsg = "Invalid Username or Password";
        res.status(400).redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  },
  getSignUp: (req, res, next) => {
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
      const newSuperAdmin = new SuperAdmin({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
        mobile: req.body.mobile,
        status: false,
        emailverified: false,
        mobileverification: true,
        isActive: true,
      });
      SuperAdmin.create(newSuperAdmin);
      console.log(newSuperAdmin);
      res.redirect("/admin/login");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/signup");
    }
  },
  statusUpdate: async (req, res, next) => {
    console.log(req.body.userId);
    const datainuser = await users.findOne({ _id: new ObjectId(userId) });
    console.log(datainuser);
    if (datainuser && datainuser.isActive) {
      value = false;
    } else {
      value = true;
    }
    users
      .findOneAndUpdate(
        { _id: req.body.userId },
        { isActive: value },
        { new: true }
      )
      .then((updatedUser) => {
        console.log(updatedUser);
        return true;
      })
      .catch((error) => {
        console.log(error);
      });
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
