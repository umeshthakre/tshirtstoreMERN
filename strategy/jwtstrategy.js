var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
require("dotenv").config();
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;
const User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((myuser) => {
          if (myuser) {
            return done(null, myuser);
          }
          return done(null, myuser);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
};
