const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/asyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

exports.createProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  return res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = 5;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeature.query;
  return res.status(200).json({
    success: true,
    products,
    productsCount,
  });
});

exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProductById = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProductById = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.remove();
  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
