const passport = require('passport');
const User = require('../models/user/User');
const sendToken = require('./jwtToken');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// google
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://kltn-be-ql.onrender.com/api/oauth2/google/callback"
    },
    async function(accessToken, refreshToken, profile, cb) {
        const {
            name,
            displayName,
            photos,
            provider,
            emails
        } = profile

        let user = await User.findOne({
            "email": emails[0].value,
        })
        if (!user) {
            user = new User({
                "firstName": name.familyName,
                "lastName": name.givenName,
                "name": displayName,
                provider,
                avatar: {
                    url: photos[0].value
                },
                enable: true,
                "email": emails[0].value,
                "password": "GOOGLEACCOUNTPASSWORDDONTTOUCHITWITHANYREASONPLS-NLHECOMSYSTEM-K19-UTE-DHSPKTTPHCM-SUPERSECRET",
            })
            await user.save({
                validateBeforeSave: false,
                new: true,
            })
        }
        return cb(null, user)
    }
));
// facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://kltn-be-ql.onrender.com/api/oauth2/facebook/callback",
    profileFields: ['email', 'name', 'displayName', 'photos']
}, async function(accessToken, refreshToken, profile, cb) {
    process.nextTick(async function() {
        const {
            phone,
            email,
            provider,
            displayName,
            name,
            id,
            photos
        } = profile

        let user = await User.findOne({
            "facebookID": id,
        })
        if (!user) {
            user = new User({
                facebookID: id,
                provider,
                "firstName": name.familyName,
                "lastName": name.givenName,
                "name": displayName,
                avatar: {
                    url: photos[0].value
                },
                enable: true,
                "password": "FACEBOOKACCOUNTPASSWORDDONTTOUCHITWITHANYREASONPLS-NLHECOMSYSTEM-K19-UTE-DHSPKTTPHCM-SUPERSECRET",

            })
        }
        await user.save({
            validateBeforeSave: false
        })
        return cb(null, user)
    })

}))


passport.serializeUser((user, cb) => {
    process.nextTick(function() {
        return cb(null, user)
    })
})

passport.deserializeUser((user, cb) => {
    cb(null, user)
})


module.exports = passport