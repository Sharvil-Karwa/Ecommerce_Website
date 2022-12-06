const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController.js");
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middleware/auth.js");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductById);
router
  .route("/newProduct")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProductById);
router
  .route("/product/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProductById);

module.exports = router;
