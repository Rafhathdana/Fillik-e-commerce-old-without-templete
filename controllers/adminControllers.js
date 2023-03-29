var Admin = require("../models/adminSchema");
const mongoose = require("mongoose");
var users = require("../models/userSchema");
var merchants = require("../models/merchantSchema");
var filterproduct = require("../models/filterSchema");
const {
  Types: { ObjectId },
} = require("mongoose");
const bcrypt = require("bcrypt");
const { response } = require("../app");
module.exports = {
  adminauth: (req, res, next) => {
    if (req.session && req.session.admin && req.session.adminLoggedIn) {
      res.redirect("/admin/home");
    } else {
      next();
    }
  },
  verify: (req, res, next) => {
    if (req.session && req.session.admin && req.session.adminLoggedIn) {
      console.log(req.session.adminLoggedIn);
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
      loggedin: req.session.adminLoggedIn,
      userslist,
    });
  },
  getUser: async (req, res, next) => {
    const userslist = await users.find().limit(10);
    res.render("admin/users", {
      title: "admin",
      fullName: req.session.admin.fullName,
      loggedin: req.session.adminLoggedIn,
      userslist,
    });
  },
  getMerchant: async (req, res, next) => {
    const merchantslist = await merchants.find().limit(10);
    res.render("admin/merchants", {
      title: "admin",
      fullName: req.session.admin.fullName,
      loggedin: req.session.adminLoggedIn,
      merchantslist,
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
  getSignUp: (req, res, next) => {
    res.render("admin/signup", {
      title: "admin",
      err_msg: req.session.adminerrmsg,
      loggedin: false,
    });
    req.session.errmsg = null;
  },
  getAddCategory: (req, res, next) => {
    res.render("admin/addCategory", {
      title: "addCategory",
      fullName: req.session.admin.fullName,
      loggedin: req.session.adminLoggedIn,
      categoryout: req.session.categoryout,
    });
    req.session.categoryout = null;
  },

  postAddCategory: async (req, res, next) => {
    try {
      console.log(req.body.categorytype);
      console.log(req.body.categoryvalue);
      const newCategory = await filterproduct.findOne({
        categoryname: req.body.categorytype,
        values: req.body.categoryvalue,
      });
      if (!newCategory) {
        const newData = new filterproduct({
          categoryname: req.body.categorytype,
          values: req.body.categoryvalue,
        });
        filterproduct.create(newData);
        req.session.categoryout = "Added";
        res.status(204).redirect("/admin/addcategory");
      } else {
        req.session.categoryout = "already value found";
        res.status(400).redirect("/admin/addcategory");
      }
    } catch (error) {
      console.log(error);
      res.status(400);
    }
  },
  postSignin: async (req, res) => {
    try {
      const newAdmin = await Admin.findOne({ email: req.body.email });
      console.log(req.body.email);
      if (newAdmin) {
        bcrypt.compare(req.body.password, newAdmin.password).then((status) => {
          if (status) {
            console.log("user exist");
            req.session.admin = newAdmin;
            req.session.adminLoggedIn = true;
            console.log(newAdmin);
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

  postSignup: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newAdmin = new Admin({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
        mobile: req.body.mobile,
        status: false,
        emailverified: false,
        mobileverification: true,
        isActive: true,
      });
      Admin.create(newAdmin);
      console.log(newAdmin);
      res.redirect("/admin/login");
    } catch (error) {
      console.log(error);
      res.redirect("/admin/signup");
    }
  },
  statusUserUpdate: async (req, res, next) => {
    try {
      const datainuser = await users.findById(req.params.userId);
      console.log(datainuser); // Check if datainuser is being logged correctly

      let value;
      if (datainuser && datainuser.isActive) {
        value = false;
      } else {
        value = true;
      }
      users
        .findOneAndUpdate(
          { _id: req.params.userId },
          { isActive: value },
          { new: true }
        )
        .then((updatedUser) => {
          res.sendStatus(204);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error(err);
    }
  },
  statusMerchantUpdate: async (req, res, next) => {
    try {
      const datainuser = await merchants.findById(req.params.userId);
      console.log(datainuser); // Check if datainuser is being logged correctly

      let value;
      if (datainuser && datainuser.isActive) {
        value = false;
      } else {
        value = true;
      }
      merchants
        .findOneAndUpdate(
          { _id: req.params.userId },
          { isActive: value },
          { new: true }
        )
        .then((updatedUser) => {
          res.sendStatus(204);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error(err);
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
