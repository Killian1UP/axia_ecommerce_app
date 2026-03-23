const User = require("../schema/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// logging in
const signin = async (req, res) => {
    try {

        const { gmail, password } = req.body
        if (!gmail || !password) {
            res.status(400).json({
                message: "Please provide all fields to sign-in"
            })
            return
        } else {
            const user = await User.findOne({ gmail })
            if (!user) {
                res.status(404).json({ message: "User not found, please proceed to register first."})
                return          
            }
            if (!user.verified) {
                return res.status(400).json({message: "User needs to verify first before logging in"})
            }
            const comparedPassword = await bcrypt.compare(password, user.password)
            if (!comparedPassword) {
                res.status(404).json({
                    message: "Email or password is incorrect, please try again!"
                })
                return
            }

            const getToken = (id) => {
                return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "30m"})
            }

            const token = getToken(user._id)

            return res
                .cookie('token', token, {httpOnly: true, sameSite:'strict'})
                .status(200)
                .json({message: "Logged in successfully, Proceed to make a post"})

        }
    } catch (error) {
        res.status(500).json(({
            message: error.message
        }))
    }
}

// request for password reset
const resetRequest = async (req, res) => {
    const { gmail } = req.body

    try {
        const user = await User.findOne({gmail})
        if (!user) {
            return res.status(400).json({
                message: "Account not found. Please contact support or try again."
            })
        }
        const { passwordResetToken, otpInvalid } = generateToken()
        user.passwordResetToken = passwordResetToken
        user.passwordResetInvalid = otpInvalid
        await user.save()

        // sending a password reset otp to the email address
        try {
            const mailObj = {
                mailFrom: `EasyBuy Global ${process.env.KITS_EMAIL}`,
                mailTo: gmail,
                subject: 'EasyBuy Password Reset',
                body: `
                    <h1>You have requested for change of password, <strong>${username}</strong> 🙌</h1>
                    <p> Here is your ${passwordResetToken}, proceed to change <p>
                `
            }

            const info = await sendMail(mailObj)
            console.log("Email sent:", info.response)

        } catch (error) {
            console.log("Email error:", error.message)
        }

    } catch (error) {
        console.log(error)
    }
}

const validationPasswordOTP = async (req, res) => {
    const { token, gmail } = req.body

    try {
        const user = await User.findOne({gmail})
        if (!user) {
            return res.status(400).json({
                message: "Account not found. Please contact support or try again."
            })
        }
        if (user.passwordResetToken !== token && user.passwordResetInvalid < Date.now()) {
            return res.status(400).json({message: "OTP is invalid or expired"})
        }
        res.status(200).json({message: "Access granted to change password"})
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    const { gmail, newPassword } = req.body

    try {
        const user = await User.findOne({passwordResetToken: token})
        if (!user) {
            return res.status(400).json({
                message: "Account not found. Please contact support or try again."
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        await user.save()

        res.status(200).json({message: "Password changed"})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signin,
    resetRequest,
    resetPassword,
    validationPasswordOTP
}