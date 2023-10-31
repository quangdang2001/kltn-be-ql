const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')
const verifyToken = require('../middleware/auth')
const { protect, admin } = require('../middleware/authMiddleware.js')

router
  .route('/trash')
  .get(verifyToken, admin, productController.getTrashProducts)
router.route('/count').get(verifyToken, admin, productController.countProducts)
router.route('/topreviews').get(productController.getTopProducts)
router.route('/category/:slug').get(productController.getProductsByCategory)
router.route('/subcategory/:id').get(productController.getProductsBySubCategory)
router
  .route('/')
  .get(productController.index)
  .post(verifyToken, admin, productController.createProduct)
router
  .route('/:id')
  .get(productController.getProductById)
  .delete(verifyToken, admin, productController.deleteProduct)
  .put(verifyToken, admin, productController.updateProduct)
router
  .route('/:id/restore')
  .patch(verifyToken, admin, productController.restoreProduct)

router
  .route('/:id/force')
  .delete(verifyToken, admin, productController.forceProduct)
router
  .route('/:id/reviews')
  .post(verifyToken, productController.createProductReview)
  .delete(verifyToken, admin, productController.deleteProductReview)
router.route('/compare').post(productController.compareProducts)
module.exports = router
