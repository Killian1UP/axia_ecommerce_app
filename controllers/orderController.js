const Cart = require("../schema/cartSchema")
const Order = require("../schema/orderSchema")
const Product = require("../schema/productSchema")


const checkoutOrder = async (req, res) => {

    const user = req.user

    try {

        // Find user's cart
        const cart = await Cart.findOne({ userId: user._id })

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            })
        }

        if (cart.products.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty"
            })
        }

        // Prepare order items
        const orderProducts = []

        for (const item of cart.products) {

            const product = await Product.findById(item.productId)

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                })
            }

            orderProducts.push({
                productId: product._id,
                productName: product.name,
                quantity: item.quantity,
                price: item.price,
                totalItemPrice: item.totalItemPrice
            })
        }

        // Create order
        const order = new Order({
            userId: user._id,
            products: orderProducts,
            totalOrderPrice: cart.totalCartItemPrice,
            shippingAddress: {
                country: user.profile?.country,
                street: user.profile?.street,
                city: user.profile?.city
            }
        })

        await order.save()

        // Clear cart
        cart.products = []
        cart.totalCartItemPrice = 0
        await cart.save()

        res.status(201).json({
            message: "Order placed successfully",
            order
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
}

const getMyOrders = async (req, res) => {
    const user = req.user
    try {
        const orders = await Order.find({userId: user._id})
            .populate('products.productId')

        if (orders.length === 0) {
            return res.status(404).json({
                message: "You have not placed any orders yet"
            })
        }

        res.status(200).json(orders)
    
    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findOne({
            _id: id,
            userId: req.user._id
        })
        .populate("userId", "-password")
        .populate('products.productId')
        
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        
        res.status(200).json(order)
    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// admin controllers
const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("userId", "-password")
            .populate("products.productId")
            .sort({ createdAt: -1 })

        if (orders.length === 0) {
            return res.status(404).json({
                message: "No orders found"
            })
        }

        res.status(200).json(orders)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}

const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params
        const { orderStatus, paymentStatus } = req.body

        const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
        const validPaymentStatuses = ["pending", "paid", "failed"]

        if (orderStatus && !validStatuses.includes(orderStatus)) {
            return res.status(400).json({
                message: "Invalid order status"
            })
        }

        if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
            return res.status(400).json({
                message: "Invalid payment status"
            })
        }

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }

        // update fields
        if (orderStatus) order.orderStatus = orderStatus
        if (paymentStatus) order.paymentStatus = paymentStatus

        await order.save()

        res.status(200).json({
            message: "Order status updated successfully",
            order
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}

module.exports = {
    checkoutOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
}