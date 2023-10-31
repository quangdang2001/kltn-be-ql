const express = require('express')
const router = express.Router()
const manufacturerControllers = require('../controllers/manufacturerControllers')
router.route('/').get(manufacturerControllers.getManufacturers)
module.exports = router
