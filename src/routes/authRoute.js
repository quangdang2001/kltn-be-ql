const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth")
const {
    admin
} = require("../middleware/authMiddleware")
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const passport = require("passport");

// @@USER


// getInfo (Haven't done)
router.route("/me").get(verifyToken, userController.getUserProfile);
//[POST] /api/auth/login
router.route("/login").post(authController.login);
//[POST] /api/auth/re
router.route("/refreshToken").post(authController.verifyRefreshToken);
//[POST] /api/auth/login
router.route("/register").post(authController.register);

//[POST] /api/auth/verify-email/:token
router.route("/verify-email/:token").post(authController.verifyEmail);
//[GET] /api/auth/logout
router.route("/logout").get(authController.logOut);
// [POST] /api/auth/password/forgot
router.route('/password/forgot').post(authController.forgotPassword)

// [PUT] /api/auth/password/resetpassword/:token
router.route('/password/resetpassword/:token').put(authController.resetPassword)

// [PUT] /api/auth/password/change
router.route('/password/change').put(verifyToken, authController.changePassword)

// @@ADMIN 

//[GET] /api/auth/admin/users
router.route("/admin/users").get(verifyToken, admin, userController.getUsers);

module.exports = router