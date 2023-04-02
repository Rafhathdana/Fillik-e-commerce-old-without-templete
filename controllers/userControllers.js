var User = require("../models/userSchema");
var Products = require("../models/productSchema");
var filterproduct = require("../models/filterSchema");
const bcrypt = require("bcrypt");
const { response } = require("../app");
module.exports = {
  getProductView: async (req, res) => {
    try {
      const count = parseInt(req.query.count) || 10;
      const page = parseInt(req.query.page) || 1;
      const productsList = await Products.find()
        .skip((page - 1) * count)
        .limit(count)
        .lean();

      const totalPages = Math.ceil((await Products.countDocuments()) / count);
      const startIndex = (page - 1) * count;

      const endIndex = Math.min(
        startIndex + count,
        await Products.countDocuments()
      );

      res.render("admin/users", {
        title: "Users List",
        fullName: req.session.user.fullName,
        loggedin: req.session.userLoggedIn,
        productsList,
        count,
        page,
        totalPages,
        startIndex,
        endIndex,
      });
    } catch (error) {
      next(error);
    }
  },
  getProductlist: async (req, res, next) => {
    try {
      const count = parseInt(req.query.count) || 10;
      const page = parseInt(req.query.page) || 1;
      const productsList = await Products.find()
        .skip((page - 1) * count)
        .limit(count)
        .lean();

      const totalPages = Math.ceil((await Products.countDocuments()) / count);
      const startIndex = (page - 1) * count;

      const endIndex = Math.min(
        startIndex + count,
        await Products.countDocuments()
      );
      let category = await filterproduct.find({ categoryname: "Category" });
      let colour = await filterproduct.find({ categoryname: "Colour" });
      let pattern = await filterproduct.find({ categoryname: "Pattern" });
      let genderType = await filterproduct.find({ categoryname: "GenderType" });
      if (req.session.userLoggedIn) {
        res.render("user/productlist", {
          title: "Users List",
          fullName: req.session.user.fullName,
          loggedin: req.session.userLoggedIn,
          productsList,
          count,
          page,
          totalPages,
          startIndex,
          endIndex,
          category,
          colour,
          pattern,
          genderType,
        });
      }
      res.render("user/productlist", {
        title: "Product List",
        loggedin: false,
        productsList,
        count,
        page,
        totalPages,
        startIndex,
        endIndex,
        category,
        colour,
        pattern,
        genderType,
      });
    } catch (error) {
      next(error);
    }
  },

  postSignup: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
        mobile: req.body.mobile,
        status: false,
        emailverified: false,
        mobileverification: true,
        isActive: true,
      });
      User.create(newUser);
      console.log(newUser);
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/signup");
    }
  },
  postSignin: async (req, res) => {
    try {
      const newUser = await User.findOne({ email: req.body.email });
      if (newUser) {
        bcrypt.compare(req.body.password, newUser.password).then((status) => {
          if (status) {
            console.log("user exist");
            req.session.user = newUser;
            req.session.userLoggedIn = true;
            console.log(newUser);
            res.redirect("/home");
          } else {
            console.log("password is not matching");
            req.session.errmsg = "Invalid Username or Password";
            res.status(400).redirect("/login");
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
