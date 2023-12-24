const asyncHandler = require('express-async-handler')
const Product = require('../models/product/productModel')
const User = require('../models/user/User')
const Order = require('../models/order/orderModal')
const Category = require('../models/category/category')
const { Route } = require('express')

class dashBoardControllers {
  getCards = asyncHandler(async (req, res) => {
    const countProducts = await Product.count({})
    const countOrders = await Order.count({})
    const sumTotalOrder = await Order.aggregate([
      {
        $group: {
          _id: { user: '' },
          sumTotalPrice: { $sum: '$totalPrice' },
        },
      },
    ])
    const countOrdersPending = await Order.count({
      isConfirm: false,
    })
    const Sum = Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    }).format(sumTotalOrder[0].sumTotalPrice)
    const result = [
      {
        icon: 'bx bx-shopping-bag',
        count: countProducts,
        title: 'Total sales',
      },
      {
        icon: 'bx bx-cart',
        count: countOrdersPending,
        title: 'New orders',
      },
      {
        icon: 'bx bx-dollar-circle',
        count: Sum,
        title: 'Total turnover',
      },
      {
        icon: 'bx bx-receipt',
        count: countOrders,
        title: 'Total orders',
      },
    ]
    res.json(result)
  })
  getTopUserOrder = asyncHandler(async (req, res) => {
    const topOrder = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $group: {
          _id: '$user',
          countOrder: { $sum: 1 },
          sumTotalPrice: { $sum: '$totalPrice' },
        },
      },
    ])
      .sort({ countOrder: -1 })
      .limit(5)
    res.json(topOrder)
  })
  getLastOrder = asyncHandler(async (req, res) => {
    const lastOrder = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
    ])
      .sort({ createdAt: -1 })
      .limit(5)
    res.json(lastOrder)
  })
  getAnalytics = asyncHandler(async (req, res) => {
    const orderAnalytics = await Order.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: '$createdAt',
            },
            month: {
              $month: '$createdAt',
            },
          },
          countOrder: {
            $sum: 1,
          },
        },
      },
    ])
    const orderCancelAnalytics = await Order.aggregate([
      {
        $match: {
          'status.statusNow': 'pending' || 'Pending',
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: '$createdAt',
            },
            month: {
              $month: '$createdAt',
            },
          },
          countOrder: {
            $sum: 1,
          },
        },
      },
    ])
    res.json({ orderAnalytics, orderCancelAnalytics })
  })

  
  getTopProductTrending = asyncHandler(async (req, res, next) => {
    const {lastDate} = req.query
    let minusDate = new Date();
    minusDate.setDate(minusDate.getDate() - lastDate)

    const productTrending = await Order.aggregate([
      {
        $project:
          {
            orderItems: 1,
            createdAt: 1,
            isDelivered: 1,
            isConfirm: 1,
            isPaid: 1,
          },
      },
      {
        $match:
          {
            createdAt: {
              $gte: minusDate,
            },
          },
      },
      {
        $unwind:
          {
            path: "$orderItems",
            preserveNullAndEmptyArrays: true,
          },
      },
      {
        $lookup:
          {
            from: "products",
            localField: "orderItems.product",
            foreignField: "_id",
            as: "order_product",
          },
      },
      {
        $unwind:
          {
            path: "$order_product",
            preserveNullAndEmptyArrays: true,
          },
      },
      {
        $group:
        {
          _id: "$order_product.name",
          countOrder: {
            $count: {},
          },
          sumRevenue: {$sum: "$orderItems.price"}
        }
      },
      {
        $sort:
          {
            countOrder: -1,
          },
      },
      {
        $limit:
          10,
      },
    ])
    return res.json(productTrending)
  })

  getCategoryTrending = asyncHandler(async (req, res, next) => {
    const {lastDate} = req.query
    let minusDate = new Date();
    minusDate.setDate(minusDate.getDate() - lastDate)

    const categoryTrending = await Order.aggregate([
      {
        $project:
          {
            orderItems: 1,
            createdAt: 1,
            isDelivered: 1,
            isConfirm: 1,
            isPaid: 1,
          },
      },
      {
        $match:
          {
            createdAt: {
              $gte: minusDate,
            },
          },
      },
      {
        $unwind:
          {
            path: "$orderItems",
            preserveNullAndEmptyArrays: true,
          },
      },
      {
        $lookup:
          {
            from: "products",
            localField: "orderItems.product",
            foreignField: "_id",
            as: "order_product",
          },
      },
      {
        $unwind:
          {
            path: "$order_product",
            preserveNullAndEmptyArrays: true,
          },
      },
      {
        $lookup:
          {
            from: "subcategories",
            localField: "order_product.subCategory",
            foreignField: "_id",
            as: "sub_cate",
          },
      },
      {
        $unwind:
          {
            path: "$sub_cate",
            preserveNullAndEmptyArrays: true,
          },
      },
      {
        $lookup:
          {
            from: "categories",
            localField: "sub_cate.category",
            foreignField: "_id",
            as: "category",
          },
      },
      {
        $unwind:
          {
            path: "$category",
            preserveNullAndEmptyArrays: true,
          },
      },
      {
        $group:
          {
            _id: "$category.name",
            countOrder: {
              $count: {},
            },
          },
      },
      {
        $sort:
          {
            countOrder: -1,
          },
      }
    ])
    return res.json(categoryTrending)
  })

}
module.exports = new dashBoardControllers()
