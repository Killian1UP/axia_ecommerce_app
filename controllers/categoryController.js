const Category = require("../schema/categorySchema")
const Product = require("../schema/productSchema")

const createCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({
                message: "Name can't be empty"
            })
        }      

        const name = req.body.name.trim().toLowerCase() // for case-sensitivity

        const newCategory = new Category({ name })

        await newCategory.save()

        res.status(201).json({
            message: "Category added",
            category: newCategory
        })

    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Category already exists"
            })
        }

        res.status(500).json({ message: error.message })
    }
}

const getCategories = async (req, res) => {
    try {
        
        const categories = await Category.find().sort({ name: 1 })

        res.status(200).json(categories)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteCategory = async (req, res) => {

    try {
        const { id } = req.params

        const category = await Category.findById(id)
        
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        const products = await Product.exists({ category: id }) // using exists is faster and lighter on memory

        if (products) {
            return res.status(400).json({
                message: "Cannot delete category because products exist under it"
            })
        }

        await category.deleteOne()
        
        res.status(200).json({
            message: "Category deleted successfully."
        })
    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findById(id)

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        // Update only allowed field
        const allowedUpdates = ["name"]

        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                category[field] = req.body[field].trim().toLowerCase()
            }
        })

        await category.save()

        res.status(200).json({
            message: "Category updated successfully.",
            category
        })
    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Category already exists"
            })
        }

        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory
}