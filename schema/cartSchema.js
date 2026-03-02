const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    totalItemPrice: {
        type: Number
    }
})

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    },
    products: [
        cartItemSchema
    ],
    totalCartItemPrice: {
        type: Number
    }
}, {timestamps: true})

const Cart =  mongoose.model('Cart', cartSchema)

module.exports = Cart