const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    gmail: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        bio: String,
        country: String,
        street: String
    },
    otp: String,
    otpInvalid: Date,
    lastOtpSent: Date,
    passwordResetToken: String,
    passwordResetInvalid: Date,
    verified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User =  mongoose.model('User', userSchema)

module.exports = User