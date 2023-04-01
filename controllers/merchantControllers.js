var Merchant = require("../models/merchantSchema");
var Product = require("../models/productSchema");
var filterproduct = require("../models/filterSchema");
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
      merchantLoggedin: false,
    });
    req.session.errmsg = null;
  },
  getSignIn: (req, res, next) => {
    res.render("merchant/signup", {
      title: "merchant",
      err_msg: req.session.merchanterrmsg,
      merchantLoggedin: false,
    });
    req.session.errmsg = null;
  },
  getHome: (req, res, next) => {
    res.render("merchant/productlist", {
      title: "product",
      brandName: req.session.merchant.brandName,
      merchantLoggedin: req.session.merchantLoggedIn,
    });
  },
  getAddProduct: async (req, res, next) => {
    let category = await filterproduct.find({ categoryname: "Category" });
    let colour = await filterproduct.find({ categoryname: "Colour" });
    let pattern = await filterproduct.find({ categoryname: "Pattern" });
    let genderType = await filterproduct.find({ categoryname: "GenderType" });

    res.render("merchant/addproduct", {
      title: "product",
      brandName: req.session.merchant.brandName,
      merchantLoggedin: req.session.merchantloggedIn,
      category,
      colour,
      pattern,
      genderType,
    });
  },
  postAddProduct: async (req, res, next) => {
    console.log(req.body);
    try {
      const images = [];
      for (const file of req.files) {
        if (file.fieldname === "images") {
          const originalName = file.originalname;
          const fileNameParts = originalName.split(".");
          const fileExtension = fileNameParts[fileNameParts.length - 1];
          const fileName = `merchant-${req.session.merchant._id}-${images.length}.${fileExtension}`;
          const filePath = `${__dirname}/public/images/${fileName}`;
          fs.writeFileSync(filePath, file.buffer);
          images.push(fileName);
        }
      }
      const newProduct = new Product({
        productid: req.session.merchant._id,
        productid: req.session.merchant._id,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        colour: req.body.colour,
        pattern: req.body.pattern,
        actualPrice: req.body.actualPrice,
        sellPrice: (req.body.actualPrice / 100) * 105,
        genderType: req.body.genderType,
        Quantity: {
          small: req.body.small,
          medium: req.body.medium,
          large: req.body.large,
          extraLarge: req.body.extraLarge,
        },
        images: images,
        isActive: true,
      });
      Product.create(newProduct);
      console.log(newProduct);
      res.redirect("/merchant/login");
    } catch (error) {
      console.log(error);
      res.redirect("/merchant/signup");
    }
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
