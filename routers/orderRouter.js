const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { checkoutOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus } = require('../controllers/orderController')
const adminMiddleware = require('../middlewares/adminMiddleware')


const orderRouter = express.Router()

orderRouter
    .post("/orders/checkout", authMiddleware, checkoutOrder)
    .get("/orders", authMiddleware, getMyOrders)
    .get("/orders/:id", authMiddleware, getOrderById)
    // admin routes
    .get("/admin/orders", authMiddleware, adminMiddleware, getAllOrders)
    .put("/admin/orders/:id", authMiddleware, adminMiddleware, updateOrderStatus)

module.exports = orderRouter