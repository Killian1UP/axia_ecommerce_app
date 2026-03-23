const express = require('express')
const {createProduct, getAllProducts, getProductById, deleteProduct, updateProduct} = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const productRouter = express.Router()


//create a product
productRouter
    .post('/products', authMiddleware, adminMiddleware, createProduct)

// get all products
    .get('/products', getAllProducts)

// get a product
    .get('/products/:id', getProductById)

// update a product
    .put('/products/:id', authMiddleware, adminMiddleware, updateProduct)

// delete a product
    .delete('/products/:id', authMiddleware, adminMiddleware, deleteProduct)


module.exports = productRouter