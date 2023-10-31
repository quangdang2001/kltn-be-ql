const express = require('express')
const router = express.Router()
const categoryControllers = require('../controllers/categoryControllers')

router.route('/').get(categoryControllers.getCategories)

module.exports = router
