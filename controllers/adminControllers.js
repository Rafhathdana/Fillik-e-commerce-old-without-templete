var Admin = require("../models/adminSchema");
const bcrypt = require("bcrypt");
const { response } = require("../app");
module.exports = {
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
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/signup");
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
            req.session.admin.loggedIn = true;
            console.log(newAdmin);
            res.redirect("/");
          } else {
            console.log("password is not matching");
            req.session.errmsg = "Invalid Username or Password";
            res.status(400).redirect("/login");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
