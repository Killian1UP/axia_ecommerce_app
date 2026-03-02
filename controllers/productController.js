const Category = require("../schema/categorySchema")
const Product = require("../schema/productSchema")


const getAllProducts = async (req, res) => {
    try {
        const { name, color, size, category } = req.query

        const filter = {}

        filter.userId = req.user._id

        if (name) filter.name = name
        if (color) filter.color = color
        if (size) filter.size = size

        if (category) {
            const foundcategory = await Category.findOne({name: category})
            if (!foundcategory) {
                return res.status(400).json({
                    message: "Category not in the database"
                })
            }
            filter.category = foundcategory._id
        }

        const products = await Product
            .find(filter)
            .populate("category")
            .populate("userId", "-password")

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



// get a product by id
const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOne({
            _id: id,
            userId: req.user._id
        })
        .populate("category")
        .populate("userId", "-password")
        
        if (!product) {
            return res.status(404).json({
                message: "Product not found or not authorized"
            })
        }
        
        res.status(200).json(product)
    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// create a product
const createProduct = async (req, res) => {
    const { name, price, color, size, imgUrl, category } = req.body
    const user = req.user
    
    try {
        if (!name || !price || !color || !category) {
            res.status(400).json({ message: "All fields are required!" })
        }
        const foundCategory = await Category.findOne({name: category})

        if (!foundCategory) {
            return res.status(400).json({message: `Inform admin to add the category ${category}`})
        }

        const newProduct = new Product({...req.body, userId: user._id, category: foundCategory._id})
        await newProduct.save()
        res.status(200).json({message: "New product created successfully."})
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete a product
const deleteProduct = async (req, res) => {

    try {
        const { id } = req.params

        const product = await Product.findOne({
            _id: id,
            userId: req.user._id
        })
        
        if (!product) {
            return res.status(404).json({
                message: "Product not found or not authorized"
            })
        }

        await product.deleteOne()
        
        res.status(200).json({
            message: "Product deleted successfully."
        })
    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// update a product
const updateProduct = async (req, res) => {
    try {
        const user = req.user
        const { id } = req.params

        const product = await Product.findOne({
            _id: id,
            userId: req.user._id
        })

        if (!product) {
            return res.status(404).json({
                message: "Product not found or not authorized"
            })
        }

        // Update only allowed fields
        const allowedUpdates = ["name", "price", "color", "size", "imgUrl", "category"]

        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                product[field] = req.body[field]
            }
        })

        await product.save()

        res.status(200).json({
            message: "Product updated successfully.",
            product
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct
}