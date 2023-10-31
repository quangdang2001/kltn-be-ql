const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    isConfirm: {
        type: Boolean,
        required: true,
        default: false,
    },
    status: {
        statusNow: {
            type: String,
            required: true,
            default: 'pending',
        },
        description: {
            type: String,
            required: true,
            default: 'Đang đợi admin xử lý.',
        },
    },
    orderItems: [{
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
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
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
    }, ],
    shippingAddress: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },

        country: {
            type: String,
            required: true,
        },
    },
    paymentMethod: {

        type: String,
        required: true,
    },
    paymentResult: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        update_time: {
            type: String,
        },
        email_address: {
            type: String,
        },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    voucher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
    },
    paymentResult: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        update_time: {
            type: String,
        },
        email_address: {
            type: String,
        },
    },
}, {
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order