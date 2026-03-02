const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createCart, deleteCartItem, deleteAllCartItems, getCartItems, editCartItem } = require('../controllers/cartController')
const cartRouter = express.Router()


// create a cart
cartRouter
    .post('/cart', authMiddleware, createCart)

// get a cart
    .get('/cart/:id', authMiddleware, getCartItems)

// edit a cart
    .put('/cart', authMiddleware, editCartItem)

// delete a cart
    .delete('/cart/:productId', authMiddleware, deleteCartItem)
    .delete('/cart', authMiddleware, deleteAllCartItems)

module.exports = cartRouter