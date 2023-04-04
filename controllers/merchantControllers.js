var Merchant = require("../models/merchantSchema");
var Product = require("../models/productSchema");
var filterproduct = require("../models/filterSchema");
const bcrypt = require("bcrypt");
const { response } = require("../app");
const multer = require("multer");

module.exports = {
  merchantauth: (req, res, next) => {
    if (req.session && req.session.merchant && req.session.merchantLoggedIn) {
      res.redirect("/merchant/home");
      console.log(req.session.merchantLoggedIn);
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
      merchantLoggedin: null,
    });
    req.session.merchanterrmsg = null;
  },
  getSignIn: (req, res, next) => {
    res.render("merchant/signup", {
      title: "merchant",
      err_msg: req.session.merchanterrmsg,
      merchantLoggedin: null,
    });
    req.session.merchanterrmsg = null;
  },
  getHome: (req, res, next) => {
    res.render("merchant/productlist", {
      title: "product",
      brandName: req.session.merchant.brandName,
      merchantLoggedin: req.session.merchantLoggedIn,
    });
  },
  getProductList: async (req, res, next) => {
    try {
      const count = parseInt(req.query.count) || 10;
      const page = parseInt(req.query.page) || 1;
      const productList = await Product.find({
        merchantid: req.session.merchant._id,
      })
        .skip((page - 1) * count)
        .limit(count)
        .lean();
      console.log(productList);
      const totalPages = Math.ceil((await Product.countDocuments()) / count);
      const startIndex = (page - 1) * count;

      const endIndex = Math.min(
        startIndex + count,
        await Product.countDocuments()
      );
      console.log(startIndex + "start");
      console.log(endIndex);
      let category = await filterproduct.find({ categoryname: "Category" });
      let colour = await filterproduct.find({ categoryname: "Colour" });
      let pattern = await filterproduct.find({ categoryname: "Pattern" });
      let genderType = await filterproduct.find({ categoryname: "GenderType" });
      res.render("merchant/productlist", {
        title: "product",
        brandName: req.session.merchant.brandName,
        merchantLoggedin: req.session.merchantLoggedIn,
        productList,
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
  getAddProduct: async (req, res, next) => {
    let category = await filterproduct.find({ categoryname: "Category" });
    let colour = await filterproduct.find({ categoryname: "Colour" });
    let pattern = await filterproduct.find({ categoryname: "Pattern" });
    let genderType = await filterproduct.find({ categoryname: "GenderType" });

    res.render("merchant/addproduct", {
      title: "product",
      brandName: req.session.merchant.brandName,
      merchantLoggedin: req.session.merchantLoggedIn,
      category,
      colour,
      pattern,
      genderType,
    });
  },
  postAddProduct: async (req, res, next) => {
    console.log(req.session.merchant);
    console.log(req.body.name);
    console.log(req.files + "hskq");
    console.log(req + "hmksjvkjfdbnkjgf,c");
    try {
      const images = [];
      let inumb = 0;
      const productid = Date.now().toString();
      const filePath = `${__dirname}/../public/images/`;
      console.log(filePath);
      console.log(productid);

      var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, filePath);
        },
        filename: function (req, file, cb) {
          const originalName = file.originalname;
          const fileNameParts = originalName.split(".");
          const fileExtension = fileNameParts[fileNameParts.length - 1];
          const fileName = `product-${productid}-${inumb}.${fileExtension}`;
          console.log(productid);
          images.push(fileName);
          inumb++;
          cb(null, fileName);
        },
      });

      const upload = multer({ storage });

      // use upload.array instead of upload.single
      upload.array("images", 10)(req, res, async (err) => {
        if (err) {
          console.error(err);
          res.redirect("/merchant/signup");
          return;
        }

        console.log(req.body.name);
        console.log(req.body);
        const newProduct = new Product({
          productid: productid,
          merchantid: req.session.merchant._id,
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          colour: req.body.colour,
          pattern: req.body.pattern,
          orginalPrice: req.body.orginalPrice,
          sellerPrice: req.body.sellerPrice,
          ourPrice: (req.body.sellerPrice / 100) * 105,
          genderType: req.body.genderType,
          Quantity: {
            small: req.body.small,
            medium: req.body.medium,
            large: req.body.large,
            extraLarge: req.body.extraLarge,
          },
          Orders: {
            small: [0],
            medium: [0],
            large: [0],
            extraLarge: [0],
          },
          images: images,
          isActive: true,
        });

        // create new product after all data is available
        await newProduct.save();

        console.log(newProduct);
        res.redirect("/merchant/login");
      });
    } catch (error) {
      console.log(error + "hai");
      res.redirect("/merchant/signup");
    }
  },
  postSignup: async (req, res) => {
    try {
      const user = await Merchant.findOne({
        $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
      }).exec();

      if (!user) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newMerchant = new Merchant({
          brandName: req.body.brandName,
          outletName: req.body.outletName,
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

        await Merchant.create(newMerchant);
        req.session.merchanterrmsg = null;
        console.log(newMerchant);
        res.redirect("/merchant/login");
      } else {
        // User exists
        req.session.merchanterrmsg = "email or mobile phone exists Already";
        res.redirect("/merchant/signup");
      }
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
              req.session.merchanterrmsg = "Invalid Username or Password";
              res.status(400).redirect("/merchant/login");
            }
          });
      } else {
        req.session.merchanterrmsg = "Invalid Username or Password";
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
  deleteProduct: async (req, res, next) => {
    let productdetails = await Product.findById(req.params.Id);
    if (
      productdetails.Orders.small.length == 1 &&
      productdetails.Orders.medium.length == 1 &&
      productdetails.Orders.large.length == 1 &&
      productdetails.Orders.extraLarge.length == 1
    ) {
      Product.deleteOne({ _id: req.params.Id })
        .then((response) => {
          if (response) {
            res.sendStatus(204);
          } else {
            res.status(400).json({ message: "unable to delete Product" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "Internal server error" });
        });
    } else {
      res.status(500).json({ message: "Can't able to delete" });
    }
  },
  statusProductUpdate: async (req, res, next) => {
    try {
      const datainuser = await Product.findById(req.params.userId);
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
};
