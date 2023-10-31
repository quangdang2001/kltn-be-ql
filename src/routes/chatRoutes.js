const express = require('express')
const ChatConTrollers = require('../controllers/chatControllers')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/')
  .get(protect, ChatConTrollers.fetchChats)
  .post(protect, ChatConTrollers.accessChat)
router.route('/group').post(protect, ChatConTrollers.createGroupChat)
router.route('/rename').put(protect, ChatConTrollers.renameGroup)
router.route('/groupremove').put(protect, ChatConTrollers.removeFromGroup)
router.route('/groupadd').put(protect, ChatConTrollers.addToGroup)

module.exports = router
