const crypto = require('crypto')
    //middleware
const catchAsyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')
const sendToken = require('../utils/jwtToken')
const User = require('../models/user/User')
const Address = require('../models/user/Address')
    //
const sendEmail = require('../utils/sendEmail')
class authController {
    // [POST] /login
    login = catchAsyncHandler(async(req, res, next) => {
            const { email, password } = req.body
                // check empty
            if (!email || !password) {
                return next(new ErrorResponse(`Missing email or password`, 400))
            }
            const user = await User.findOne({
                email,
            }).select('+password')
            if (!user) return next(new ErrorResponse(`User not found`, 404))
                // Checks if password is correct or not
            const isPasswordMatched = await user.comparePassword(password)
            if (!isPasswordMatched) {
                return next(new ErrorResponse(`Invalid Email or Password`, 401))
            }

            sendToken(user, 200, res)
        })
        //[POST] /register
    register = catchAsyncHandler(async(req, res, next) => {
            const { email, password, gender, addressForm, phone, name } = req.body
            if (!email | !password) {
                return next(new ErrorResponse(`Missing email or password`, 400))
            }
            const user = await User.findOne({
                email: email,
            })

            if (user) return next(new ErrorResponse(`Existing email`, 400))

            const newUser = new User({
                email,
                password,
                addresses: [],
                gender,
                phone,
                name,
            })

            const newAddress = await Address.create(addressForm.detailAddress)
            addressForm.detailAddress = newAddress
            newUser.addresses.push({
                ...addressForm,
                address: `${addressForm.address}`,
                detailAddress: newAddress,
            })

            const verifyToken = newUser.verifyEmailToken()
            await newUser.save()

            // send email
            // const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verifyToken}`;
            const resetUrl = `${process.env.CLIENT_URL}/api/auth/verify-email/${verifyToken}`

            const message = `Your verify token for active ${newUser.name} is as follow:\n\n${resetUrl}\n\nLink will be expired after 30 minutes\n\nIf you have not requested this email, then ignore it.`

            try {
                await sendEmail({
                    email: newUser.email,
                    subject: 'HLN website Email Verify',
                    message: message,
                })
                res.status(200).json({
                    success: true,
                    user: newUser,
                    message: `Email sent to: ${newUser.email}, account will be removed from system after 30 minutes without verify`,
                })
            } catch (e) {
                newUser.emailCodeExpires = undefined
                newUser.emailCodeToken = undefined
                await newUser.save({
                    validateBeforeSave: false,
                })

                return next(new ErrorResponse(e.message, 500))
            }
        })
        // [POST] /refreshToken
    verifyRefreshToken = catchAsyncHandler(async(req, res, next) => {
            const { refreshToken } = req.body
            if (!refreshToken)
                return next(new ErrorResponse('Missing refresh token', 404))
            const hashToken = crypto
                .createHash('sha256')
                .update(refreshToken)
                .digest('hex')
            console.log('HASH' + hashToken)
            const user = await User.findOne({
                refreshToken: hashToken,
                refreshTokenExpires: {
                    $gt: Date.now(),
                },
            })
            if (!user)
                return next(
                    new ErrorResponse('Invalid refresh token or expired, Login again', 404)
                )
            sendToken(user, 200, res)
        })
        // [POST] /verify-email/:token
    verifyEmail = catchAsyncHandler(async(req, res, next) => {
            const { token } = req.params

            // Hash URL token
            const verifyToken = crypto.createHash('sha256').update(token).digest('hex')
            const user = await User.findOne({
                emailCodeToken: verifyToken,
                emailCodeExpires: {
                    $gt: Date.now(),
                },
            })

            if (!user) {
                return next(
                    new ErrorResponse('Verify token is invalid or has been expired', 400)
                )
            }
            user.enable = true
            user.emailCodeExpires = undefined
            user.emailCodeToken = undefined
            await user.save({
                validateBeforeSave: false,
            })
            sendToken(user, 200, res)
        })
        // [POST] /logout
    logOut = catchAsyncHandler(async(req, res, next) => {
            res.cookie(`accessToken`, null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            })
            res.status(200).json({
                success: true,
                message: 'Logout successfully',
            })
        })
        //[POST] /password/forgot
    forgotPassword = catchAsyncHandler(async(req, res, next) => {
            const user = await User.findOne({
                email: req.body.email,
            })
            if (!user)
                return next(
                    new ErrorResponse("User not found, email haven't register yet ", 404)
                )

            const resetPasswordToken = user.verifyEmailToken()

            await user.save({
                validateBeforeSave: false,
            })

            // Mail sending
            // Create reset password url
            const resetUrl = `${resetPasswordToken}`

            const message = `Your verify token for reset ${user.name}'s password is :\n\n${resetUrl}\n\nCode will be expired after 30 minutes\n\nIf you have not requested this email, then ignore it.`
            try {
                await sendEmail({
                    email: user.email,
                    subject: 'NLH-ecom Password Recovery',
                    message,
                })

                res.status(200).json({
                    success: true,
                    message: `Email sent to: ${user.email}`,
                })
            } catch (e) {
                user.resetPasswordToken = undefined
                user.resetPasswordExpire = undefined

                await user.save({
                    validateBeforeSave: false,
                })

                return next(new ErrorResponse(e.message, 500))
            }
        })
        //[PUT]  /password/resetpassword/:token
    resetPassword = catchAsyncHandler(async(req, res, next) => {
            if (!req.body.password) return next(new ErrorResponse('Missing password'))
            const token = crypto
                .createHash('sha256')
                .update(req.params.token)
                .digest('hex')
            const user = await User.findOne({
                emailCodeToken: token,
                emailCodeExpires: {
                    $gt: Date.now(),
                },
            })
            if (!user)
                return next(
                    new ErrorResponse('Invalid token or expired token, try again', 404)
                )
            user.password = req.body.password
            user.emailCodeExpires = undefined
            user.emailCodeToken = undefined
            await user.save({
                validateBeforeSave: false,
            })
            res.status(200).json({
                success: true,
                message: 'Password reset successfully',
            })
        })
        //[PUT] /password/change
    changePassword = catchAsyncHandler(async(req, res, next) => {
        const user = await User.findById(req.user._id).select('+password')
        if (!user) return next(new ErrorResponse('User not found', 404))
        const { enteredPassword, newPassword } = req.body
        if (!enteredPassword || !newPassword)
            return next(new ErrorResponse('Missing password', 400))
        const checkPassword = await user.comparePassword(enteredPassword)
        if (!checkPassword)
            return next(new ErrorResponse('Password incorrect', 400))
        user.password = newPassword
        await user.save({
            validateBeforeSave: false,
        })
        res.status(200).json({
            success: true,
            message: 'Update user password successfully',
        })
    })
}

module.exports = new authController()