const express = require('express')
const {createUser, getAllUsers, getUserById, deleteUser, updateUser} = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const userRouter = express.Router()


//create a user
userRouter
    .post('/register', createUser)

// get all users
    .get('/users', authMiddleware, getAllUsers)

// get a user
    .get('/users/:id', authMiddleware, getUserById)

// update a user
    .put('/users/:id', authMiddleware, updateUser)

// delete a user
    .delete('/users/:id', authMiddleware, deleteUser)


module.exports = userRouter