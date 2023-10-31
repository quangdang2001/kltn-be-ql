//Get model
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

//Create new category   /api/v1/admin/category/new
exports.newCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    sucess: true,
    category,
  });
});

//Get All categories    /api/v1/admin/categories

exports.getCategory = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    sucess: true,
    count: categories.length,
    categories,
  });
});
