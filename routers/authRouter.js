const express = require('express')
const {signin, resetRequest, resetPassword, validationPasswordOTP} = require('../controllers/authController')
const authRouter = express.Router()


//create a product
authRouter
    .post('/signin', signin)
    .post('/password/resetRequest', resetRequest)
    .post('/password/validate', validationPasswordOTP)
    .post('/password/reset', resetPassword)
module.exports = authRouter