const express = require('express')
const {createUser, getAllUsers, getUserById, deleteUser, updateUser} = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const userRouter = express.Router()


//create a user
userRouter
    .post('/register', createUser)

// get all users
    .get('/allUsers', getAllUsers)

// get a user
    .get('/user/:id', getUserById)

// update a user
    .put('/user/:id', authMiddleware, updateUser)

// delete a user
    .delete('/user/:id', authMiddleware, deleteUser)


module.exports = userRouter