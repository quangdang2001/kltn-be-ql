const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/auth')
const { admin } = require('../middleware/authMiddleware')
const dashBoardControllers = require('../controllers/dashBoard')

// @@USER
//[GET,POST] /api/auth/cart
router.route('/').get(dashBoardControllers.getCards)
router.route('/topOrders').get(dashBoardControllers.getTopUserOrder)
router.route('/lastOrders').get(dashBoardControllers.getLastOrder)
router.route('/analytics').get(dashBoardControllers.getAnalytics)
router.route('/productTrending').get(dashBoardControllers.getTopProductTrending)
router.route('/cateTrending').get(dashBoardControllers.getCategoryTrending)

module.exports = router
