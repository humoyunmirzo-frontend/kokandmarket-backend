const database = require('../models/index')
const sendError = require('../utils/sendError.util')
const Product = database.products
const { validationResult } = require('express-validator')
const {Op} =  require('sequelize')
// GET
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll()

        return res.status(200).json({
            products,
            count: products.length
        })
    } catch (error) {
        sendError(res, error)
    }
}

// GET BY ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)

        if (!product) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        res.status(200).json({
            product
        })
    } catch (error) {
        sendError(res, error)
    }
}
// GET BY SEARCH VALUE

const getProductBySearchValue = async (req, res) => {
    try {
        const searchValue = req.query.name;
        const products = await Product.findAll({
            where: {
                name: { [Op.iLike]: `%${searchValue}%` }
            }
        });

        return res.status(200).json({
            products,
            count: products.length
        });
    } catch (error) {
        sendError(res, error)
    }
};
// POST
const createProduct = async (req, res) => {
    try {
        const { validationResult } = require('express-validator')
        const errors = validationResult(req)
      if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                errorMessage: errors.array()[0].msg
            })
        }
        const { name, categoryId, brandId } = req.body

        const newProduct = await Product.create({ name, categoryId, brandId })

        res.status(201).json({
            message: "Muvaffaqiyatli qo'shildi",
            product: newProduct
        })
    } catch (error) {
        sendError(res, error)
    }
}

// PUT
const updateProduct = async (req, res) => {
    try {
        const errors = validationResult(req)
      if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                errorMessage: errors.array()[0].msg
            })
        }
        const product = await Product.findByPk(req.params.id)

        if (!product) {
            return res.status(404).json({
                message: "Not found"
            })
        }

        const { name, categoryId, brandId } = req.body

        await Product.update({ name, categoryId, brandId }, {
            where: { id: req.params.id }
        })

        const updatedProduct = await Product.findByPk(req.params.id)
        res.status(200).json({
            message: "Muvaffaqiyatli yangilandi",
            product: updatedProduct
        })
    } catch (error) {
        sendError(res, error)
    }
}
// DELETE

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)

        if (!product) {
            return res.status(404).json({
                message: "Not found"
            })
        }

        await Product.destroy({
            where: { id: req.params.id }
        })

        res.status(202).json({
            message: "Muvaffaqiyatli o'chirildi"
        })
    } catch (error) {
        sendError(res, error)
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductBySearchValue,
    createProduct,
    updateProduct,
    deleteProduct
}