const express = require('express')
const router = express.Router()
const upload = require("multer")({
    dest: "uploads"
})

const verifyToken = require('../middleware/auth')
const {
    admin
} = require('../middleware/authMiddleware')
const eventController = require('../controllers/eventControllers')

// @@USER
//[GET,POST] /api/events
router.route('/').get(eventController.getListEvent).post(verifyToken, admin, upload.single("image"), eventController.postEvent)
    //  [HARD DELETE] /api/events/expiredEvents
router.route('/expiredEvents').delete(verifyToken, admin, eventController.removeEvent)
    // [PUT,SOFT-DELETE] /api/events/:id
router.route('/:id').put(verifyToken, admin, upload.single("image"), eventController.updateEvent).delete(verifyToken, admin, eventController.deleteEvent).get(verifyToken, admin, eventController.getEventById)
    // @@ADMIN
router.route('/admin/get').get(verifyToken, admin, eventController.getAllEvents)
module.exports = router
