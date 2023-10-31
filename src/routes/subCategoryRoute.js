const express = require('express')
const router = express.Router()
const subCategoryController = require('../controllers/subcategoryControllers')

router.route('/').get(subCategoryController.getSubByCategories)
module.exports = router
