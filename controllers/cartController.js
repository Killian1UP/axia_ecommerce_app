const Cart = require("../schema/cartSchema")
const Product = require("../schema/productSchema")


const createCart = async (req, res) => {

    const { productId, quantity } = req.body
    const user = req.user
    
    const qty = quantity && quantity > 0 ? quantity : 1


    try {
        if (!productId) {
            return res.status(400).json({message: "Product ID is required"})
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(400).json({message: "Product not found in the database"})
        }
        let usersCart = await Cart.findOne({userId: user._id})
        if (!usersCart) {
            usersCart = new Cart({
                userId: user._id,
                products: [
                    {
                        productId: productId,
                        quantity: qty,
                        price: product.price,
                        totalItemPrice: product.price * qty
                    }
                ]
            })
        } else {
            const itemInCart = usersCart.products.find(item => item.productId.toString() === productId) // to check if there is an item in cart
            if (itemInCart) {
                itemInCart.quantity += qty
            } else {
                usersCart.products.push({
                    productId: productId,
                    quantity: qty,
                    price: product.price,
                    totalItemPrice: product.price * qty
                })
            }
        }

        // update the total of each item
        usersCart.products.forEach(item => {
            item.totalItemPrice = item.price * item.quantity
        })

        // update the cart total
        let totalCartItemPrice = usersCart.products.reduce((accumulator, item) => {
            return accumulator + item.totalItemPrice
        }, 0)
        usersCart.totalCartItemPrice = totalCartItemPrice

        // save cart
        await usersCart.save()
        res.status(201).json({
            message: "Product successfully added",
            cart: usersCart
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getCartItems = async (req, res) => {
    const user = req.user
    try {
        const cartItems = await Cart.findOne({userId: user._id}).populate('products.productId')
        if (!cartItems) {
            return res.status(400).json({message: "No items added yet"})
        }
        res.status(200).json(cartItems)
    } catch (error) {
        console.log(error)
    }
}

const deleteCartItem = async (req, res) => {

    const { productId } = req.params
    const user = req.user

    try {

        const cart = await Cart.findOne({ userId: user._id })

        if (!cart) {
            return res.status(400).json({
                message: "Your cart is empty!"
            })
        }

        // Remove the item from the cart
        cart.products = cart.products.filter(
            item => item.productId.toString() !== productId
        )

        // Recalculate item totals
        cart.products.forEach(item => {
            item.totalItemPrice = item.price * item.quantity
        })

        // Recalculate cart total
        cart.totalCartItemPrice = cart.products.reduce(
            (accumulator, item) => accumulator + item.totalItemPrice,
            0
        )

        await cart.save()

        res.status(200).json({
            message: "Product removed from cart",
            cart
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteAllCartItems = async (req, res) => {
    const user = req.user

    try {
        
        const cart = await Cart.findOne({userId: user._id})
        
        if (!cart) {
            return res.status(400).json({message: "Your cart is empty!"})
        }
        
        cart.products = []
        cart.totalCartItemPrice = 0
      
        await cart.save()
        
        res.status(200).json({
             message: "All cart items removed successfully",
             cart
        })
    } catch (error) {
        console.log(error)
    }

}

const editCartItem = async (req, res) => {
    const user = req.user
    const { productId, type } = req.body
    if (!productId || !type) {
        return res.status(400).json({message: "Please provide all fields"})
    }
    try {
        const cart = await Cart.findOne({userId: user._id})
        if (!cart) {
            return res.status(400).json({message: "Your cart is empty! Browse our categories and discover our best deals!"})
        }
        
        const itemInCart = cart.products.find(item => item.productId.toString() == productId)

        if (!itemInCart) {
            return res.status(400).json({message: "Product not found in cart"})
        }
        
        const typeNormalized = type.toLowerCase();

        if (typeNormalized === 'increase') {
            itemInCart.quantity += 1
        } else if (typeNormalized === 'decrease') {
            if (itemInCart.quantity > 1) {
                itemInCart.quantity -= 1
            } else {
                return res.status(400).json({message: "Quantity cannot be less than 1"})
            }
        } else {
            return res.status(400).json({message: "Type can only be increase or decrease"})
        }
        // update the total of each item
        cart.products.forEach(item => {
            item.totalItemPrice = item.price * item.quantity
        })

        // update the cart total
        let totalCartItemPrice = cart.products.reduce((accumulator, item) => {
            return accumulator + item.totalItemPrice
        }, 0)
        cart.totalCartItemPrice = totalCartItemPrice

        // save cart
        await cart.save()
        res.status(200).json({
            message: "Product successfully updated",
            cart
        })        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createCart,
    deleteCartItem,
    deleteAllCartItems,
    getCartItems,
    editCartItem
}