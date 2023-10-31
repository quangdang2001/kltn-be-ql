const Manufactor = require("../models/manufactor");

const asyncHandler = require("express-async-handler");

//Create new manufactor      /api/v1/admin/manufactor/new
exports.newManufator = asyncHandler(async (req, res, next) => {
  const manufactor = await Manufactors.create(req.body);
  res.status(201).json({
    sucess: true,
    manufactor,
  });
});

//Get all manufactor    /api/v1/admin/manufactors
exports.getManufactor = asyncHandler(async (req, res, next) => {
  const manufactors = await Manufactor.find();

  res.status(200).json({
    sucess: true,
    count: manufactors.length,
    manufactors,
  });
});
