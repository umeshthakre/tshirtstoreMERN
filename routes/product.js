const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  removeProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//userid
router.param("userId", getUserById);
//set up params //productid
router.param("productId", getProductById);

//create product
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//get product
router.get("/product/:productId", getProduct);
//getting photo using middleware to improve performace
router.get("/product/photo/:productId", photo);

//delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

//update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//listening route to list all the products
router.get("/products", getAllProducts);

//getting distinct categories
router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
