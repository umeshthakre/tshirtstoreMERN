const mongoose = require("mongoose");
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const jsonwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const email = req.body.email;

  User.findOne({ email })

    .then((user) => {
      if (user) {
        res.send({ error: "user already exists for this email" });
      } else {
        const myUser = new User({
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
        });
        myUser.save((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Not able to save user in database",
            });
          }
          res.json(user);
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email })
    .then((myuser) => {
      if (!myuser) {
        return res.status(404).json({ error: "user not found" });
      } else {
        if (!myuser.authenticate(password)) {
          return res.status(401).json({ error: "password does not match" });
        }

        const payload = {
          id: myuser.id,
          email: myuser.email,
          name: myuser.name,
        };
        const token = jsonwt.sign({ _id: myuser.id }, process.env.secret);
        res.cookie("token", token, { expire: new Date() + 3600 });
        const { _id, name, email, role } = myuser;
        return res.json({ token, user: { _id, name, email, role } });
      }
    })
    .catch((err) => console.log(err));
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout successfull",
  });
};

//custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "not admin access denied",
    });
  }
  next();
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.secret,
  userProperty: "auth",
});
