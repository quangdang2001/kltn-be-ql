const mongoose = require('mongoose')
const subCategorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const Subcategory = mongoose.model('Subcategory', subCategorySchema)
module.exports = Subcategory
