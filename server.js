const express = require('express')
const productRouter = require('./routers/productRouter')
const connectDB = require('./mongoDb/dbconnection')
const userRouter = require('./routers/userRouter')
const authRouter = require('./routers/authRouter')
const cookieParser = require('cookie-parser')
const otpVerifyRouter = require('./routers/otpVerifyRouter')
const cartRouter = require('./routers/cartRouter')
const categoryRouter = require('./routers/categoryRouter')
const orderRouter = require('./routers/orderRouter')

require('dotenv').config()
connectDB()

const server = express()
const port = process.env.PORT 

// middlewares
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cookieParser())

// routers
server.use('/api', productRouter)
server.use('/api', userRouter)
server.use('/api', authRouter)
server.use('/api', otpVerifyRouter)
server.use('/api', cartRouter)
server.use('/api', orderRouter)
server.use('/api', categoryRouter)


server.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})