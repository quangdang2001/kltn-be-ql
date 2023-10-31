const productColor = require("../models/product/productColor");

const asyncHandler = require("express-async-handler");
const productColor = require("../models/product/productColor");

//Create new product color      /api/v1/admin/productcolor/new
exports.newProductColor = asyncHandler(async (req, res, next) => {
  const productColor = await productColor.create(req.body);
  res.status(201).json({
    sucess: true,
    productColor,
  });
});

//Get All product color   /api/v1/admin/productcolors

exports.getAllProductColor = asyncHandler(async (req, res, next) => {
  const productColors = await productColor.find();
  res.status(200).json({
    sucess: true,
    count: productColors.length,
    productColors,
  });
});
