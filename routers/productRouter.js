const express = require('express')
const {createProduct, getAllProducts, getProductById, deleteProduct, updateProduct, getProductsByQuery} = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')
const productRouter = express.Router()


//create a product
productRouter
    .post('/product', authMiddleware, createProduct)

// get all products
    .get('/products', authMiddleware, getAllProducts)

// get a product
    .get('/product/:id', getProductById)

// update a product
    .put('/product/:id', authMiddleware, updateProduct)

// delete a product
    .delete('/product/:id', authMiddleware, deleteProduct)


module.exports = productRouter