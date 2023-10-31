const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    item: {
      quantity: {
        type: Number,
        default: 1,
        required: [true, 'Missing quantity line-item'],
      },
      name: {
        type: String,
        required: true,
      },
      info: {
        colorName: {
          type: String,
          required: true,
        },
        optionName: {
          type: String,
          required: true,
        },
        listingPrice: {
          type: Number,
        },
        manufacturerName: {
          type: String,
          require: true,
          default: '',
        },
        subCategoryName: {
          type: String,
          require: true,
          default: '',
        },
        promotionDescription: {
          type: String,
          require: true,
          default: '',
        },
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      color: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      option: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      countInStock: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
)

const Item = mongoose.model('Item', ItemSchema)
module.exports = Item
