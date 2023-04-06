var User = require("../models/userSchema");
var Products = require("../models/productSchema");
var filterproduct = require("../models/filterSchema");
const bcrypt = require("bcrypt");
const { response } = require("../app");
const otp = require("../controllers/otp");
module.exports = {
  getProductView: async (req, res, next) => {
    try {
      const count = 10;
      const page = 1;
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
      const productItem = await Products.findById(req.params.productId);
      if (req.session.userLoggedIn) {
        res.render("user/productView", {
          title: "Users List",
          fullName: req.session.user.fullName,
          loggedin: req.session.userLoggedIn,
          productItem,
          productsList,
          count,
          page,
          totalPages,
          startIndex,
          endIndex,
        });
      } else {
        res.render("user/productView", {
          title: "Users List",
          loggedin: false,
          productItem,
          productsList,
          count,
          page,
          totalPages,
          startIndex,
          endIndex,
        });
      }
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
      console.log(productsList);
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
      } else {
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
      }
    } catch (error) {
      next(error);
    }
  },
  postSignup: async (req, res) => {
    try {
      const vUser = await User.findOne({
        $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
      }).exec();

      if (!vUser) {
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

        await User.create(newUser);
        req.session.errmsg = null;
        console.log(newUser);
        res.redirect("/login");
      } else {
        // User exists
        req.session.errmsg = "email or mobile phone exists Already";
        console.log(error);
        res.redirect("/signup");
      }
    } catch (error) {
      console.log(error);
      res.redirect("/signup");
    }
  },
  postSignin: async (req, res) => {
    try {
      const newUser = await User.findOne({ email: req.body.email });
      if (newUser) {
        if (newUser.isActive === true) {
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
          req.session.errmsg = "Account was Blocked Contact US";
          res.status(402).redirect("/login");
        }
      } else {
        req.session.errmsg = "Invalid Username or Password";
        res.status(400).redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  },
  sendOtp: async (req, res, next) => {
    try {
      console.log(req.body.mobile);
      if (!req.session.otP) {
        req.session.otP = Math.floor(100000 + Math.random() * 900000);
      } else {
      }
      console.log(req.session.otP);
      otp
        .OTP(req.body.mobile, req.session.otP)
        .then((response) => {
          response.success = true;
          res.status(200).send({
            response,
            success: true,
            message: "OTP Sent successfully",
          });
        })
        .catch((error) => {
          res
            .status(500)
            .send({ success: false, message: "Error sending OTP" });
        });
    } catch (error) {
      console.log(error);
    }
  },
  verifyOtp: async (req, res, next) => {
    try {
      if (parseInt(req.body.userOtp) === req.session.otP) {
        res.status(200).send({
          success: true,
          response,
          message: "OTP verified successfully",
        });
      } else {
        req.session.errmsg = "Invalid Otp";
        res.status(500).send({ success: false, message: "Invalid Otp" });
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
  productFilterList: async (req, res, next) => {
    try {
      const count = 20;
      const page = parseInt(req.query.page) || 1;
      const filter = req.filterData;
      let productsList;
      if (filter) {
        productsList = await Products.find(filter)
          .skip((page - 1) * count)
          .limit(count)
          .lean();
      } else {
        productsList = await Products.find()
          .skip((page - 1) * count)
          .limit(count)
          .lean();
      }
      console.log(productsList);
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
      } else {
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
      }
    } catch (error) {
      next(error);
    }
  },
  getFilter: async (req, res, next) => {
    try {
      const { minPrice, maxPrice, category, genderType, colour, sizes } =
        req.body;

      // Construct the filter object
      const filter = {};

      if (minPrice && maxPrice) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
      } else if (minPrice) {
        filter.price = { $gte: minPrice };
      } else if (maxPrice) {
        filter.price = { $lte: maxPrice };
      }

      if (category) {
        filter.category = category;
      }

      if (genderType) {
        filter.genderType = genderType;
      }

      if (colour) {
        filter.colour = colour;
      }

      if (sizes) {
        filter.sizes = { $in: sizes };
      }

      req.filterData = filter;
      next();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
  postFilter: async (req, res, next) => {
    try {
      const { minPrice, maxPrice, category, genderType, colour, sizes } =
        req.body;

      // Construct the filter object
      const filter = {};

      if (minPrice && maxPrice) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
      } else if (minPrice) {
        filter.price = { $gte: minPrice };
      } else if (maxPrice) {
        filter.price = { $lte: maxPrice };
      }

      if (category) {
        filter.category = category;
      }

      if (genderType) {
        filter.genderType = genderType;
      }

      if (colour) {
        filter.colour = colour;
      }

      if (sizes) {
        filter.sizes = { $in: sizes };
      }

      req.filterData = filter;
      next();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  dumy: async (req, res, next) => {
    try {
      const count = parseInt(req.query.count) || 10;
      const page = parseInt(req.query.page) || 1;
      const productsList = await Products.find()
        .skip((page - 1) * count)
        .limit(count)
        .lean();
      console.log(productsList);
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
        res.render("user/productlisting*", {
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
      } else {
        res.render("user/productlisting", {
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
      }
    } catch (error) {
      next(error);
    }
  },
  cart: async (req, res, next) => {
    try {
      const count = parseInt(req.query.count) || 10;
      const page = parseInt(req.query.page) || 1;
      const productsList = await Products.find()
        .skip((page - 1) * count)
        .limit(count)
        .lean();
      console.log(productsList);
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
        res.render("user/cart*", {
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
      } else {
        res.render("user/cart", {
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
      }
    } catch (error) {
      next(error);
    }
  },
};
