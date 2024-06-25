const database = require('../models/index')
const sendError = require('../utils/sendError.util')
const ProductProperty = database.productProperties

// GET
const getAllProductProperties = async (req, res) => {
    try {
        const productProperties = await ProductProperty.findAll()

        res.status(200).json({
            properties: productProperties
        })
    } catch (error) {
        sendError(res, error)
    }
}

// GET BY ID
const getProductPropertyById = async (req, res) => {
    try {
        const productProperty = await ProductProperty.findByPk(req.params.id)

        if (!productProperty) {
            return res.status(404).json({
                message: "Hech qanday ma'lumot topilmadi"
            })
        }

        res.status(200).json({
            property: productProperty
        })
    } catch (error) {
        sendError(res, error)
    }
}

// POST

const createProductProperty = async (req, res) => {
    try {
        const { value, unit, productId, propertyId } = req.body

        const newProductProperty = await ProductProperty.create({
            value, unit, productId, propertyId
        })

        res.status(201).json({
            message: "Muvaffaqiyatli qo'shildi",
            property: newProductProperty
        })
    } catch(error){
        sendError(res, error)
    }
}

// PUT
const updateProductProperty = async (req, res) => {
    try {
        const productProperty = await ProductProperty.findByPk(req.params.id)

        if (!productProperty) {
            return res.status(404).json({
                message: "Hech qanday ma'lumot topilmadi"
            })
        }
        const { value, unit, productId, propertyId } = req.body

        await ProductProperty.update({
            value, unit, productId, propertyId
        },
            { where: { id: req.params.id } }
        )
        const updatedProductProperty = await ProductProperty.findByPk(req.params.id)

        res.status(201).json({
            message: "Muvaffaqiyatli yangilandi",
            property: updatedProductProperty
        })
    } catch(error){
        sendError(res, error)

    }
}

// DELETE
const deleteProductProperty = async (req, res) => {
    try {
        const productProperty = await ProductProperty.findByPk(req.params.id)

        if (!productProperty) {
            return res.status(404).json({
                message: "Hech qanday ma'lumot topilmadi"
            })
        }
        await ProductProperty.destroy({
            where: {id: req.params.id}
        })
        res.status(202).json({
            message: "Muvaffaqiyatli o'chirildi"
        })
    } catch (error) {
        sendError(res, error)
    }
}

module.exports = {
    getAllProductProperties,
    getProductPropertyById,
    createProductProperty,
    updateProductProperty,
    deleteProductProperty
}