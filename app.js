//import mongoose
const mongoose = require("mongoose");
//express
const express = require("express");
require("dotenv").config();

// import passport js
const passport = require("passport");

//creating app
const app = express();

//import middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//importing routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/payment");

//port from env
const PORT = process.env.PORT || 8000;

//creating database connection and passing parameters
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //successfull connection
  .then((req, res) => {
    console.log("connected");
  })
  //error handeling
  .catch((err) => {
    console.log(err);
  });

//using middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
require("./strategy/jwtstrategy")(passport);

//my routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);

//for heroku
const path = require("path");
if (process.env.NODE_ENV) {
  app.use(express.static(path.resolve(process.cwd(), "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "client/build/index.html"));
  });
}
//starting server // listening on port
app.listen(process.env.PORT, () => {
  console.log("hey i am listening on" + process.env.PORT);
});
