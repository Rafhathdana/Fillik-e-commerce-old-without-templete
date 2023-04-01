var User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { response } = require("../app");
module.exports = {
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
