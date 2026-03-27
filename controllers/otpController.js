const { generateToken, sendMail } = require("../lib/sendMail")
const User = require("../schema/userSchema")



const otpVerify = async (req, res) => {
    const { otp, gmail } = req.body

    try {
        const user = await User.findOne({ gmail })
        if (!user) {
            return res.status(400).json({message: "User not found"})
        }
        if (user.verified) {
            return res.status(400).json({message: "User is already verified"})
        }
        if (user.otp && user.otp !== otp) {
            return res.status(400).json({message: "OTP invalid"})
        }
        if (user.otpInvalid < Date.now()) {
            return res.status(400).json({message: "OTP has expired"})
        }

        user.otp = undefined
        user.otpInvalid = undefined
        user.verified = true

        await user.save()

        try {
            const mailObj = {
                mailFrom: `EasyBuy Global ${process.env.KITS_EMAIL}`,
                mailTo: gmail,
                subject: 'EasyBuy OTP Verification',
                body: `
                    <h1>Welcome to EasyBuy Global, <strong>${username}</strong> 🙌</h1>
                    <p> Here is your resents OTP ${otp}, proceed to verify <p>
                    <p> Please do not reply to this email, as it is coming from the app <p>
                `
            }

            const info = await sendMail(mailObj)
            console.log("Email sent:", info.response)

        } catch (error) {
            console.log("Email error:", error.message)
        }
    
        res.status(200).json({message: "Your account has been verified, you can proceed to sign in"})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const otpResend = async (req, res) => {
    const { gmail } = req.body
    const time = Date.now()

    try {
        const user = await User.findOne({ gmail })
        if (!user) {
            return res.status(400).json({message: "User not found"})
        }
        if (user.verified) {
            return res.status(400).json({message: "User is already verified"})
        }
        if (time - user.lastOtpSent < 60 * 1000) {
            return res.status(400).json({message: "Please wait for 1 minute to request another OTP"})
        }

        const { otp, otpInvalid } = generateToken()

        user.otp = otp
        user.otpInvalid = otpInvalid
        user.lastOtpSent = time

        await user.save()

       try {
            const mailObj = {
                mailFrom: `EasyBuy Global ${process.env.KITS_EMAIL}`,
                mailTo: gmail,
                subject: 'EasyBuy OTP Resend',
                body: `
                    <p> This is the OTP resend ${otp} <p>
                `
            }

            const info = await sendMail(mailObj)
            console.log("Email sent:", info.response)

        } catch (error) {
            console.log("Email error:", error.message)
        }
        res.status(200).json({message: "Please check your email for the OTP"})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    otpVerify,
    otpResend
}