const express = require('express')
const {otpVerify, otpResend} = require('../controllers/otpController')
const otpVerifyRouter = express.Router()


//create a product
otpVerifyRouter
    .post('/verify', otpVerify)
    .post('/resendOTP', otpResend)


module.exports = otpVerifyRouter