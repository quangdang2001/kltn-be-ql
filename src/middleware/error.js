const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
    console.log("Error handler")
    err.statusCode = err.statusCode || 500;


    console.log({
        ...err
    });

    res.status(err.statusCode).json({
        success: false,
        error: err,
        errMessage: err.message,
        message: err.message,
        stack: err.stack
    })


    // if (process.env.NODE_ENV === 'PRODUCTION') {
    //     let error = {
    //         ...err
    //     }

    //     error.message = err.message;

    //     // Wrong Mongoose Object ID Error
    //     if (err.name === 'CastError') {
    //         const message = `Resource not found. Invalid: ${err.path}`
    //         error = new ErrorResponse(message, 400)
    //     }

    //     // Handling Mongoose Validation Error
    //     if (err.name === 'ValidationError') {
    //         const message = Object.values(err.errors).map(value => value.message);
    //         error = new ErrorResponse(message, 400)
    //     }

    //     // Handling Mongoose duplicate key errors
    //     if (err.code === 11000) {
    //         const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    //         error = new ErrorResponse(message, 400)
    //     }

    //     // Handling wrong JWT error
    //     if (err.name === 'JsonWebTokenError') {
    //         const message = 'JSON Web Token is invalid. Try Again!!!'
    //         error = new ErrorResponse(message, 400)
    //     }

    //     // Handling Expired JWT error
    //     if (err.name === 'TokenExpiredError') {
    //         const message = 'JSON Web Token is expired. Try Again!!!'
    //         error = new ErrorResponse(message, 400)
    //     }

    //     res.status(error.statusCode || 500).json({
    //         success: false,
    //         message: error.message || 'Internal Server Error'
    //     })
    // }
};

module.exports = errorHandler