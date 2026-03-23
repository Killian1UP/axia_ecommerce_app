const express = require('express')
const {createProduct, getAllProducts, getProductById, deleteProduct, updateProduct} = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')
const productRouter = express.Router()


//create a product
productRouter
    .post('/products', authMiddleware, createProduct)

// get all products
    .get('/products', authMiddleware, getAllProducts)

// get a product
    .get('/products/:id', getProductById)

// update a product
    .put('/products/:id', authMiddleware, updateProduct)

// delete a product
    .delete('/products/:id', authMiddleware, deleteProduct)


module.exports = productRouter