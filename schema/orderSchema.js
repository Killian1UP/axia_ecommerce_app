const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalItemPrice: {
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [orderItemSchema],
    totalOrderPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "card", "paypal"],
        default: "cash"
    },
    shippingAddress: {
        country: String,
        street: String,
        city: String
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)

module.exports = Order