const mongoose = require('mongoose')

const voucherSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    description: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        unique: true,
        required: true,
    },
    deliveryFee: {
        type: Boolean,
        required: true,
        default: false,
    },
    promotion: {
        type: Number,
        required: true,
        default: 100000, //VND  giảm tiền
    },
    conditions: {
        maxDiscount: {
            type: Number,
            required: true,
            default: 50000, //VND
        },
        minTotalPrice: {
            type: Number,
            required: true,
            default: 2000000, //VND
        },
    },
    limit: {
        type: Number,
        required: true,
        default: 10,
    },
    private: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})
const Voucher = mongoose.model('Voucher', voucherSchema)
module.exports = Voucher