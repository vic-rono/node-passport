const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.user = (req, res) => res.render("login");

exports.register = (req, res) => res.render("register");

exports.registers = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedPassword2 = await bcrypt.hash(password2, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      password2: hashedPassword2,
    });
    password != password2 && errors.push({ msg: "Passwords do not match" });
    password.length < 8 &&
      errors.push({ msg: "Password should be at least 8 characters" });

    !newUser && errors.push({ msg: "Please fill in all fields" });

    if (errors.length > 0) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ msg: "Email is already registered" });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          newUser;
        }
      });
    }

    newUser
      .save()
      .then((user) => {
        req.flash("success_msg", "You are now registered and can login");
        return res.redirect("/users/login");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Logged out");
  res.redirect("/users/login");
};
