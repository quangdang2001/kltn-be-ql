const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyToken = require('../middleware/auth')
const { protect, admin } = require('../middleware/authMiddleware.js')
const { userParser } = require('../utils/cloudinaryConfig')
router.route('/trash').get(verifyToken, admin, userController.getTrashUsers)
//[PUT] /api/users/profile
//[GET] /api/users/profile
router
  .route('/profile')
  .get(verifyToken, userController.getUserProfile)
  .put(verifyToken, userController.updateUserProfile)
router.route('/:id/restore').patch(protect, admin, userController.restoreUser)
router.route('/:id/force').delete(protect, admin, userController.forceUser)
router
  .route('/address/:addressID')
  .get(verifyToken, userController.getAddress)
  .delete(verifyToken, userController.deleteAddress)

// avatar update
router
  .route('/avatar')
  .put(verifyToken, userParser.single('image'), userController.updateUserAvatar)

//[PUT] /api/users/profile
//[GET] /api/users/profile
router.route('/').get(verifyToken, admin, userController.getUsers)
router
  .route('/:id')
  .delete(verifyToken, admin, userController.deleteUser)
  .get(verifyToken, admin, userController.getUserById)
  .put(verifyToken, admin, userController.updateUser)

module.exports = router
