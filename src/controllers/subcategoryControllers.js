const subCategory = require('../models/subCategory/subCategory')
const asyncHandler = require('express-async-handler')

class subCategoryController {
  getSubByCategories = asyncHandler(async (req, res, next) => {
    const keyword = req.query.categoryId
    const key = keyword
      ? {
          category: keyword,
        }
      : {}

    try {
      const subcategories = await subCategory.find(key)
      if (subcategories) {
        res.status(200).json(subcategories)
      } else {
        res.status(400)
        throw new Error('subcategories not found')
      }
    } catch (error) {
      res.status(400)
      throw new Error(error)
    }
  })
}
module.exports = new subCategoryController()
