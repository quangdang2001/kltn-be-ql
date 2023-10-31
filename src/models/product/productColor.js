const mongoose = require("mongoose");

const productColorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter name product color"],
    trim: true,
    maxLenght: [50, "Category must be at least 50 characters"],
  },
});

module.exports = mongoose.model("ProductColor", productColorSchema);
