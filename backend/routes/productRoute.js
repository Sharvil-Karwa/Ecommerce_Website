const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  createProductReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController.js");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth.js");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductById);
router
  .route("/newProduct")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProductById);
router
  .route("/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductById);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getAllReviews);
router.route("/review").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
