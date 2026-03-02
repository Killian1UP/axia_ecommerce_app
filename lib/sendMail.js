const nodemailer = require("nodemailer")
const crypto = require("crypto")

const generateToken = () => {
    return {
        otp: Math.floor(1000000 + Math.random() * 900000).toString(),  // math.floor rounds off to the nearest integer
        otpInvalid: new Date(Date.now() + 20 * 60 * 1000),
        passwordResetToken: crypto.randomBytes(32).toString('hex') 
    }
} 

const sendMail = async ({mailFrom, mailTo, subject, body}) => {
    try {
        //verify the app
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.KITS_EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })

        // now send the email
        const info = await transporter.sendMail({
            from: mailFrom,
            to: mailTo,
            subject,
            html: body
        })
        return info
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    generateToken,
    sendMail
}