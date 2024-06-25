const database = require('../models/index')
const Property = database.properties
const sendError = require('../utils/sendError.util')
const { validationResult } = require('express-validator')

const {Op} = require('sequelize')
// GET ALL PROPERTIES
const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.findAll()

        res.status(200).json({
            properties
        })
    } catch (error) {
        sendError(res, error)
    }
}
// GET PROPERTY BY ID

const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id)
        if (!property) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        res.status(200).json({
            property
        })
    } catch (error) {
        sendError(res, error)
    }
}

// GET BY SEARCH VALUE

const getPropertiesBySearchValue = async (req, res) => {
    try {
        const searchValue = req.query.name;
        const properties = await Property.findAll({
            where: {
                name: { [Op.iLike]: `%${searchValue}%` }
            }
        });

        return res.status(200).json({
            properties,
            count: properties.length
        });
    } catch (error) {
        sendError(res, error)
    }
};

// POST
const createProperty = async (req, res) => {
    try {
         const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                errorMessage: errors.array()[0].msg
            })
        }
        const { name } = req.body
        const newProperty = await Property.create({ name })

        return res.status(201).json({
            message: "Muvaffaqiyatli qo'shildi",
            property: newProperty
        })
    } catch (error) {
        sendError(res, error)
    }
}

// PUT
const updateProperty = async (req, res) => {
    try {
         const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                errorMessage: errors.array()[0].msg
            })
        }
        const { name } = req.body
        const property = await Property.findByPk(req.params.id)
        if (!property) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        await Property.update(
            { name },
            {
                where: { id: req.params.id }
            })
        const updatedProperty = await Property.findByPk(req.params.id)

        return res.status(201).json({
            message: "Muvaffaqiyatli yangilandi",
            property: updatedProperty
        })
    } catch (error) {
        sendError(res, error)
    }
}


// DELETE

const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id)
        if (!property) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        await Property.destroy(
            {
                where: { id: req.params.id }
            })

        return res.status(202).json({
            message: "Muvaffaqiyatli o'chirildi",
        })
    } catch (error) {
        sendError(res, error)
    }
}
module.exports = {
    getAllProperties,
    getPropertyById,
    getPropertiesBySearchValue,
    createProperty,
    updateProperty,
    deleteProperty
}