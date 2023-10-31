const asyncHandler = require('express-async-handler')
const catchAsyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')
const Order = require('../models/order/orderModal')
const Item = require('../models/cart/Item')
const Product = require('../models/product/productModel')
const Voucher = require('../models/voucher/voucher')
const sendEmailGrid = require('../utils/sendEmailGrid')
const sgMail = require('@sendgrid/mail')
var nodemailer = require('nodemailer')
const renderGmail = require('../data/email')
const User = require('../models/user/User')
class orderControllers {
  addOrderItems = asyncHandler(async (req, res, next) => {
    console.log('here')
    const {
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentResult,
      voucher,
    } = req.body
    const items = await Item.find({
      user: req.user._id,
    })

    if (items && items.length === 0) {
      res.status(400)
      throw new Error(` no Order item `)
      return
    } else {
      const orderItems = []
      items.map((item) => {
        orderItems.push(item.item)
      })
      if (voucher) {
        const findVoucher = await Voucher.findById(voucher)

        if (findVoucher) {
          findVoucher.limit -= 1
          await findVoucher.save()
        } else {
          return next(new ErrorResponse('Voucher not found', 400))
        }
      }
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        voucher,
      })
      if (paymentResult) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = paymentResult
      }
      const createdOrder = await order.save()
      if (createdOrder) {
        order.orderItems.map(async (item) => {
          const product = await Product.findById(item.product)
          product.productOptions.forEach((Option, index) => {
            if (Option._id.toString() === item.option.toString()) {
              Option.colors.forEach((color, i) => {
                if (color._id.toString() === item.color.toString()) {
                  product.productOptions[index].colors[i].quantity -=
                    item.quantity
                }
              })
            }
          })
          await product.save()
        })
        await Item.deleteMany({
          user: req.user._id,
        })
        res.status(201).json(createdOrder)
      } else {
        if (voucher) {
          const findVoucher = await Voucher.findById(voucher)
          await findVoucher.save()
          if (findVoucher) {
            findVoucher.limit += 1
          }
        }
        return next(new ErrorResponse('Add order fail', 400))
      }
    }
  })
  //@desc Get order by ID
  //@route GET/api/orders/:id
  //@access Private

  getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
    if (!order) return next(new ErrorResponse('Order not found', 404))
    res.status(200).json({
      success: true,
      message: 'Get order by ID',
      order,
    })
  })
  //@desc Get order by ID
  //@route GET/api/orders/:id
  //@access Private

  updateOrderById = catchAsyncHandler(async (req, res, next) => {
    const { shippingAddress, voucher } = req.body
    const order = await Order.findById(req.params.id).populate('user')
    if (!order) return next(new ErrorResponse('Order not found', 404))
    order.shippingAddress = shippingAddress
    if (voucher) {
      const findVoucher = await Voucher.findById(voucher)
      if (findVoucher) {
        findVoucher.limit -= 1
        await findVoucher.save({
          validateBeforeSave: false,
        })
        order.voucher = voucher
      } else {
        return next(new ErrorResponse('Voucher Invalid', 400))
      }
    }
    await order.save({
      validateBeforeSave: false,
    })
    res.status(200).json({
      success: true,
      message: 'Update order successfully',
      order,
    })
  })
  //@desc UPDATE order tp paid
  //@route GET/api/orders/:id/pay
  //@access Private
  updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }
      const updateOrder = await order.save()
      res.json(updateOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
  //@desc GET logged in user orders
  //@route GET/api/orders/myorders
  //@access Private
  getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 })
    res.json(orders)
  })
  //@desc GET logged in user orders
  //@route GET/api/orders/
  //@access Private Admin
  getAllOrders = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.page) || 1
    const count = await Order.count({})
    const orders = await Order.find({})
      .populate({
        path: 'user',
      })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
    if (orders) {
      res.json({
        orders,
        page,
        pages: Math.ceil(count / pageSize),
      })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
  //@desc PUT order by ID
  //@route PUT/api/orders/confirm/:id
  //@access Private Admin
  confirmOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isConfirm = true
      await order.save()
      const user = await User.findById(order.user)
      const formData = {
        user: user.email,
        subject: 'confirm',
        mail: renderGmail(order.orderItems),
      }
      sendEmailGrid(formData)
      res.json({
        success: true,
      })
    } else {
      return next(new ErrorResponse('Confirm failed', 404))
    }
  })

  //@desc Update status
  //@route PUT/api/orders/:id
  //@access Private
  //In body
  /*
    status:{
      statusNow:"cancel",
      description:"Ly do huy"
    }
    */
  //in Body
  updateStatusOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.status = req.body.status
      if (req.body.status.statusNow === 'Shipped') {
        if (!order.isPaid) {
          order.isPaid = true
          order.paidAt = Date.now()
        }
        order.isDelivered = true
        order.deliveredAt = Date.now()
      }
      const updateOrder = await order.save()
      if (updateOrder) {
        res.status(200).json({
          success: true,
          order: updateOrder,
          message: 'update order successfully',
        })
      } else {
        return next(new ErrorResponse('update failed', 404))
      }
    } else {
      return next(
        new ErrorResponse(
          'update order not found or order was confirm by admin',
          404
        )
      )
    }
  })
  //@desc GET top  user order
  //@route GET / api/users/TopOrder
  //@access Private
  getTopUserOrder = catchAsyncHandler(async (req, res) => {
    const topOrder = await Order.aggregate([
      {
        $group: {
          _id: {
            user: '$user',
          },
          count: {
            $sum: 1,
          },
        },
      },
    ])
      .sort({
        count: -1,
      })
      .limit(5)

    res.json(topOrder)
  })
  quickPayMomoControler = asyncHandler(async (req, res) => {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    const {
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      voucher,
    } = req.body

    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var accessKey = 'F8BBA842ECF85'
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz'
    var orderInfo = 'pay with MoMo'
    var partnerCode = 'MOMO'
    var redirectUrl =
      'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b'
    var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b'
    var requestType = 'payWithMethod'
    var amount = '50000'
    var orderId = partnerCode + new Date().getTime()
    var requestId = orderId
    var extraData = ''
    var paymentCode =
      'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA=='
    var orderGroupId = ''
    var autoCapture = true
    var lang = 'vi'

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType
    //puts raw signature
    console.log('--------------------RAW SIGNATURE----------------')
    console.log(rawSignature)
    //signature
    const crypto = require('crypto')
    var signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex')
    console.log('--------------------SIGNATURE----------------')
    console.log(signature)

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    })
    //Create the HTTPS objects
    const https = require('https')
    const options = {
      hostname: 'test-payment.momo.vn',
      port: 443,
      path: '/v2/gateway/api/create',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
    }
    //Send the request and get the response
    const request = https.request(options, (response) => {
      console.log(`Status: ${res.statusCode}`)
      console.log(`Headers: ${JSON.stringify(res.headers)}`)
      response.setEncoding('utf8')
      response.on('data', (body) => {
        console.log('Body: ')
        console.log(body)
        console.log('resultCode: ')
        console.log(JSON.parse(body).resultCode)
        if (JSON.parse(body).resultCode == 0) {
          res.json(JSON.parse(body).payUrl)
        }
      })
      response.on('end', () => {
        console.log('No more data in response.')
      })
    })

    request.on('error', (e) => {
      console.log(`problem with request: ${e.message}`)
    })
    // write data to request body
    console.log('Sending....')
    request.write(requestBody)
    request.end()
  })
  InpController = asyncHandler(async (req, res) => {
    console.log('hee')
  })
}

module.exports = new orderControllers()
