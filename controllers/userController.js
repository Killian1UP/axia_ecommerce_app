const { generateToken, sendMail } = require("../lib/sendMail")
const User = require("../schema/userSchema")
const bcrypt = require("bcrypt")

// create a user
const createUser = async (req, res) => {
    try {
        const { username, gmail, password } = req.body

        if (!username || !gmail || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            })
        } else {
            const user = await User.findOne({ gmail })
            if (user) {
                res.status(404).json({ message: "User is already registered, proceed to login." })
                return
            }
            const hashedPassword = await bcrypt.hash(password, 10)

            // generate otp
            const {otp, otpInvalid} = generateToken()
            const time = Date.now()

            const newUser = new User(
                {
                    username,
                    gmail,
                    password: hashedPassword,
                    otp,
                    otpInvalid,
                    lastOtpSent: time
                }
            )
            await newUser.save()

            try {
                const mailObj = {
                    mailFrom: `EasyBuy Global ${process.env.KITS_EMAIL}`,
                    mailTo: gmail,
                    subject: 'EasyBuy OTP Verification',
                    body: `
                        <h1>Welcome to EasyBuy Global, <strong>${username}</strong> 🙌</h1>
                        <p> Here is your OTP ${otp}, proceed to verify <p>
                        <p> Please do not reply to this email, as it is coming from the app <p>
                    `
                }

                const info = await sendMail(mailObj)
                console.log("Email sent:", info.response)

            } catch (error) {
                console.log("Email error:", error.message)
            }

            res.status(200).json({
                message: "User registered successfully. Check your email for OTP."
            })           
        }
        
    } catch (error) {
        res.status(500).json(({
            message: error.message
        }))
    }
}

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (users.length === 0) {
            return res.status(200).json({
                message: "No user(s) was found, you must register or sign-in as a user."
            })
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// get a user by id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({
                message: `User with the id ${id} is not found`
            })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(400).json({
                message: `User with the id ${id} is not found`
            })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// update a user
const updateUser = async (req, res) => {
    try {
        const { username, gmail, password } = req.body
        const { id } = req.params
        const user = await User.findByIdAndUpdate(
            id,
            { username, gmail, password },
            {new: true} 
        )
        if (!user) {
            return res.status(400).json({
                message: `User with the id ${id} is not found`
            })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}