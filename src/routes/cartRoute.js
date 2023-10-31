const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const { admin } = require("../middleware/authMiddleware");
const cartControllers = require("../controllers/cartControllers");

// @@USER
//[GET,POST] /api/auth/cart
router
    .route("/")
    .get(verifyToken, cartControllers.getCart)
    .put(verifyToken, cartControllers.updateCart)
    .post(verifyToken, cartControllers.addToCart);
// @@ADMIN
//[GET] /api/auth/admin/users
router.route("/admin").get((req, res) => {
    res.json({
        message: "cart route",
    });
});

//[GET] /api/auth/admin/users
router.route("/test").get((req, res) => {
    res.json({
        message: "Test route cart",
    });
});

module.exports = router;