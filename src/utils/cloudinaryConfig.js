const Event = require("../models/event/event")

const multer = require('multer');
const cloudinary = require('cloudinary').v2
const {
    CloudinaryStorage
} = require("multer-storage-cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_HOST,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// init
const userStorage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "userAvatar",
            format: async() => "png",
            public_id: (req, file) => req.user._id,
        }
    })
    // const eventStorage = new CloudinaryStorage({
    //     cloudinary: cloudinary,
    //     params: {
    //         folder: "eventBanner",
    //         format: async() => "png",
    //         public_id: (req, file) => `banner${Date.now().toString()}`
    //     }


// })

const userParser = multer({
        storage: userStorage,
    })
    // const eventParser = multer({
    //     storage: eventStorage
    // })
module.exports = {
    userParser,
    // eventParser
}