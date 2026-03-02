const express = require('express')
const adminMiddleware = require('../middlewares/adminMiddleware')
const {createCategory, getCategories, deleteCategory, updateCategory} = require('../controllers/categoryController')

const categoryRouter = express.Router()


//create a product
categoryRouter
    .post('/product/category', adminMiddleware, createCategory)
    .get('/categories', getCategories)
    .delete('/product/category/:id', adminMiddleware, deleteCategory)
    .put('/product/category/:id', adminMiddleware, updateCategory)

module.exports = categoryRouter