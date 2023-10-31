const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter category name"],
    trim: true,
    maxLenght: [50, "Category must be at least 50 characters"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
