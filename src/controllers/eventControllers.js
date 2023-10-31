const Event = require('../models/event/event')
const Product = require('../models/product/productModel')
const catchAsyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')
const cloudinary = require('cloudinary').v2
class eventController {
    // @@USER
    // [GET] /api/events
    getListEvent = catchAsyncHandler(async(req, res, next) => {
            const events = await Event.aggregate([{
                $match: {
                    $expr: {
                        $gt: ["$expireIn", Date.now()]
                    },
                }
            }, {
                $sort: {
                    expireIn: 1,
                }
            }])


            res.status(200).json({
                success: true,
                message: "Available events",
                events,
            })
        })
        // [POST] /api/events
    postEvent = catchAsyncHandler(async(req, res, next) => {
            const {
                products,
                name,
                availableDays,
                color,
                award
            } = JSON.parse(req.body.data)
            let days = availableDays * 24 * 60 * 60 * 1000

            const image = await cloudinary.uploader.upload(req.file.path, {
                folder: "/eventBanner",
                public_id: `banner${Date.now()}`
            })
            const event = await Event.create({
                name,
                user: req.user._id,
                banner: {
                    url: image.secure_url,
                    public_id: image.public_id,
                },
                color,
                award,
                products,
                expireIn: Date.now() + days,
            })
            if (!event) return next(new ErrorResponse("Create event failure", 400))
            res.status(200).json({
                success: true,
                message: "Event created successfully",
                event
            })
        })
        // @@UPDATE
        // [PUT] /api/events/:id
    updateEvent = catchAsyncHandler(async(req, res, next) => {
            const {
                name,
                products,
                availableDays,
                color,
                award
            } = JSON.parse(req.body.data)
            const event = await Event.findById(req.params.id)
            if (!event) return next(new ErrorResponse(`Event not found`, 404))
            if (req.file) {
                const image = await cloudinary.uploader.upload(req.file.path, {
                    public_id: event.banner.public_id,
                })
                event.banner.url = image.secure_url || event.banner.url
            }
            const addDays = availableDays * 24 * 60 * 60 * 1000
            if (!event) return next(new ErrorResponse("Event not found or Expired", 404))
            event.products = products || event.products
            event.name = name || event.name
            event.color = color || event.color
            event.award = award || event.award

            event.expireIn = Date.now() + (addDays || 0)
            await event.save({
                validateBeforeSave: false
            })
            res.status(200).json({
                success: true,
                message: "Event updated successfully",
                event
            })
        })
        // @@ DELETE
        // SOFT DELETE EVENT BY ID
        // [SOFT-DELETE] /api/events/:id 
    deleteEvent = catchAsyncHandler(async(req, res, next) => {
            const event = await Event.findOne({
                "_id": req.params.id,
                expireIn: {
                    $gt: Date.now()
                },
            })
            if (!event) return next(new ErrorResponse("Event not found or Expired", 404))
            event.expireIn = new Date(Date.now())
            await event.save({
                validateBeforeSave: true,
            })
            res.status(200).json({
                success: true,
                message: "Event disable successfully with nothing change this will be removed from database after 7days, permanently",
            })
        })
        // [PUT] /api/events/:id
    enableEvent = catchAsyncHandler(async(req, res, next) => {
            const event = await Event.findOne({
                "_id": req.params.id,
                "expireIn": {
                    $lte: Date.now()
                }
            })
            if (!event) return next(new ErrorResponse("Valid event not found", 404))
        })
        // [HARD-DELETE] /api/events/expiredEvent
    removeEvent = catchAsyncHandler(async(req, res, next) => {
            const eventsCount = await Event.deleteMany({
                "expireIn": {
                    $lte: Date.now()
                }
            })
            if (!eventsCount.deletedCount) return next(new ErrorResponse("Zero expired events found", 404))

            res.status(200).json({
                success: true,
                numberOfDelete: eventsCount.deletedCount,
                message: `Cleared ${eventsCount.deletedCount} expired events successfully`,
            })
        })
        // @@ADMIN
    getAllEvents = catchAsyncHandler(async(req, res, next) => {
        const event = await Event.find({}).populate('user', 'name')
            // const {type,}
        if (!event) return next(new ErrorResponse("Zero event found", 404))
        res.status(200).json({
            success: true,
            events: event,
            message: "Get all events successfully"
        })
    })
    getEventById = catchAsyncHandler(async(req, res, next) => {
        const event = await Event.findById(req.params.id)
        if (!event) return next(new ErrorResponse("Event not found", 404))


        res.status(200).json({
            success: true,
            event: event,
            message: "Get event by id successfully"
        })
    })

}
module.exports = new eventController()