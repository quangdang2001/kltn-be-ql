const Manufacturer = require('../models/manufacturer/manufacturer')
const asyncHandler = require('express-async-handler')

class ManufacturerControllers {
  getManufacturers = asyncHandler(async (req, res, next) => {
    const manufacturers = await Manufacturer.find({})
    if (manufacturers) {
      res.status(200).json(manufacturers)
    } else {
      res.status(404)
      throw new Error('manufacturers not found')
    }
  })
}

module.exports = new ManufacturerControllers()
