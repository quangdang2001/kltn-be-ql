const Category = require('../models/category/category')
const asyncHandler = require('express-async-handler')

class CategoryController {
  getCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({})
    if (categories) {
      res.status(200).json(categories)
    } else {
      res.status(404)
      throw new Error('not found category')
    }
  })
}

module.exports = new CategoryController()
