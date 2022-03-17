const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({ error: "product not found" });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "error with file",
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ error: "all fields are compulsory" });
    }

    //creating product object from Product model
    let product = new Product(fields);
    //handle file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "size too big" });
      }
      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }
    // console.log(product);
    //save to db
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "error in saving in db",
        });
      }
      res.json(product);
    });
  });
};

//get all products

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? ParseInt(req.query.limit) : 10;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, allProducts) => {
      if (err) {
        return res.status(400).json({ error: "error while fetching products" });
      }
      res.json(allProducts);
    });
};

//getting all unique categories
exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({ error: "error no category found" });
    }
    res.json(category);
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
//remove product
exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, removedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "failed to delete product",
      });
    }
    res.json({ message: "Deleted successfull" });
  });
};
//update product
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "error with file",
      });
    }

    //getting product from getProductById
    //updating product
    let product = req.product;
    product = _.extend(product, fields);
    //handle file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "size too big" });
      }
      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }
    // console.log(product);
    //save to db
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "updation product failed",
        });
      }
      res.json(product);
    });
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};
