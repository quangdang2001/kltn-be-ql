const express = require('express')
const ErrorResponse = require('../utils/ErrorResponse')
const sendToken = require('../utils/jwtToken')
const passport = require("../utils/passportConfig")
const router = express.Router()


//@@ GOOGLE

// [GET] /api/oauth2/google
router.route('/google').get(passport.authenticate('google', {
        scope: ['profile email']
    }))
    // [GET] /api/oauth2/redirect/google
router.route('/google/callback').get(passport.authenticate('google', {
    failureRedirect: 'https://kltn-be-ql.onrender.com/api/oauth2/error',
}), function(req, res) {
    if (!req.user) return next(new ErrorResponse("User not found", 404))

    const accessToken = req.user.getJwtToken()
    res.redirect(`https://kltn-fe-ql.vercel.app/oauth2/redirect?token=${accessToken}`)

})



//@@ FACEBOOK
// [GET] /api/oauth2/facebook
router.route('/facebook').get(passport.authenticate('facebook'))

// [GET] /oauth2/facebook/callback
router.route('/facebook/callback').get(passport.authenticate('facebook', {
        failureRedirectL: 'https://kltn-be-ql.onrender.com/api/oauth2/error',
    }), function(req, res) {

        if (!req.user) return next(new ErrorResponse("User not found", 404))
        const accessToken = req.user.getJwtToken()
        res.redirect(`https://kltn-fe-ql.vercel.app/oauth2/redirect?token=${accessToken}`)
    })
    //@@ RESPONSE
    // [GET] /api/oauth2/error
router.route('/error').get((req, res) => {
        res.status(400).json({
            success: false,
            message: "Oauth2 Failure"
        })
    })
    // [GET] /api/oauth2/success
router.route('/success').get((req, res) => {
    res.status(400).json({
        success: true,
        message: "Oauth2 Success"
    })
})


module.exports = router