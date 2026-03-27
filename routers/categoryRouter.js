const express = require('express')
const adminMiddleware = require('../middlewares/adminMiddleware')
const {createCategory, getCategories, deleteCategory, updateCategory} = require('../controllers/categoryController')

const categoryRouter = express.Router()


//create a product
categoryRouter
    .post('/categories', adminMiddleware, createCategory)
    .get('/categories', getCategories)
    .delete('/categories/:id', adminMiddleware, deleteCategory)
    .put('/categories/:id', adminMiddleware, updateCategory)

module.exports = categoryRouter