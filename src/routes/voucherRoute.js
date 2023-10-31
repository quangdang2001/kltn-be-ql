const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/auth')
const { admin } = require('../middleware/authMiddleware')
const voucherControllers = require('../controllers/voucherControllers')

// @@USER
//[GET,POST] /api/auth/cart
router
  .route('/')
  .get(verifyToken, voucherControllers.getVoucher)
  .put(verifyToken, voucherControllers.addVoucherForProduct)
  .post(verifyToken, admin, voucherControllers.addVoucher)
router.route('/:id').get(verifyToken, voucherControllers.getVoucherById)

// @@ADMIN
//[GET] /api/auth/admin/users
// router.route('/admin').get((req, res) => {
//   res.json({
//     message: 'cart route',
//   })
// })

module.exports = router
