const asyncHandler = require('express-async-handler')
const catchAsyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')
const Voucher = require('../models/voucher/voucher')
const Product = require('../models/product/productModel')

class voucherControllers {
    getVoucher = catchAsyncHandler(async(req, res, next) => {
        const keyword = req.query.key
        const key = keyword ? {
            key: keyword,
        } : {}
        const vouchers = await Voucher.find({
            ...key,
            private: req.query.private
        })
        if (vouchers) {
            res.status(200).json({
                success: true,
                vouchers,
            })
        } else {
            return next(new ErrorResponse('Voucher not found', 400))
        }
    })
    getVoucherById = catchAsyncHandler(async(req, res, next) => {
        const voucherId = req.params.id

        const vouchers = await Voucher.findById(voucherId)
        if (vouchers) {
            res.status(200).json({
                success: true,
                vouchers,
            })
        } else {
            return next(new ErrorResponse('Voucher not found', 400))
        }
    })
    addVoucher = catchAsyncHandler(async(req, res, next) => {
        const {
            key,
            limit,
            deliveryFee,
            promotion,
            conditions,
            description
        } =
        req.body
        const voucher = new Voucher({
            user: req.user._id,
            key,
            limit,
            deliveryFee,
            promotion,
            description,
            conditions,
        })
        const createVoucher = voucher.save()
        if (createVoucher) {
            res.status(200).json({
                success: true,
                message: 'Voucher added successfully',
            })
        } else {
            return next(new ErrorResponse('Add voucher fail', 400))
        }
    })
    addVoucherForProduct = catchAsyncHandler(async(req, res, next) => {
        const {
            voucherId,
            productId
        } = req.body
        const voucher = await Voucher.findById(voucherId)
        const checkProduct = voucher.productList.find(
            (v) => v.product.toString() === productId.toString()
        )
        if (checkProduct) {
            return next(new ErrorResponse('Product voucher is exit', 400))
        } else {
            voucher.productList.push({
                product: productId,
            })
        }
        await voucher.save()
        if (voucher) {
            res.json(voucher)
        } else {
            return next(new ErrorResponse('Add voucher fail', 400))
        }
    })
}

module.exports = new voucherControllers()