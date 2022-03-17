var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
//signout
router.get(
  "/signout",

  signout
);
//signin
router.post(
  "/signin",
  [
    check("email", "email error").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
  ],
  signin
);
//signup
router.post(
  "/signup",
  [
    check("name", "name should be three characters long").isLength({ min: 3 }),
    check("email", "email error").isEmail(),
    check("password", "invalid password").isLength({ min: 5 }),
  ],
  signup
);

//protected route
router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

//export
module.exports = router;
