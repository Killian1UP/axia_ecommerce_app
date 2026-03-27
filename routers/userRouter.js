const express = require('express')
const {createUser, getAllUsers, getUserById, deleteUser, updateUser} = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const userRouter = express.Router()


//create a user
userRouter
    .post('/register', createUser)

// get all users
    .get('/users', authMiddleware, adminMiddleware, getAllUsers)

// get a user
    .get('/users/:id', authMiddleware, getUserById)

// update a user
    .put('/users/:id', authMiddleware, updateUser)

// delete a user
    .delete('/users/:id', authMiddleware, adminMiddleware, deleteUser)


module.exports = userRouter