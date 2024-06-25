const database = require('../models/index')
const {Op} = require('sequelize')
const sendError = require('../utils/sendError.util')
const { validationResult } = require('express-validator')
const Brand = database.brands

// GET
const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll()
        const brandsCount = brands.length

        return res.status(200).json({
            brands,
            count: brandsCount
        })
    } catch (error) {
        sendError(res, error)
    }
}

// GET BY ID
const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id)
        if (!brand) {
            return res.status(404).json({
                message: 'Not found'
            })
        }

        res.status(200).json({
            brand: brand
        })
    } catch (error) {
        sendError(res, error)
    }
}

// GET BY SEARCH VALUE

const getBrandBySearchValue = async (req, res) => {
    try {
        const searchValue = req.query.name;
        const brands = await Brand.findAll({
            where: {
                name: { [Op.iLike]: `%${searchValue}%` }
            }
        });

        return res.status(200).json({
            brands,
            count: brands.length
        });
    } catch (error) {
        sendError(res, error)
    }
};

// POST
const createBrand = async (req, res) => {
    try {
        const errors = validationResult(req)
      if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                errorMessage: errors.array()[0].msg
            })
        }
        const { name } = req.body
        const newBrand = await Brand.create({ name })

        return res.status(201).json({
            message: "Muvaffaqiyatli qo'shildi",
            brand: newBrand
        })
    } catch (error) {
        sendError(res, error)
    }
}

// PUT
const updateBrand = async (req, res) => {
    try {
        const errors = validationResult(req)
      if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                errorMessage: errors.array()[0].msg
            })
        }
        const { name } = req.body
        const brand = await Brand.findByPk(req.params.id)
        if (!brand) {
            return res.status(404).json({
                message: 'Not found'
            })
        }
         await Brand.update({ name }, {
            where: { id: req.params.id }
        })
        const updatedBrand = await Brand.findByPk(req.params.id)

        return res.status(200).json({
            message: 'Muvaffaqiyatli yangilandi',
            brand: updatedBrand
        })
    } catch (error) {
        sendError(res, error)
    }
}

// DELETE
const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id)
        if (!brand) {
            return res.status(404).json({
                message: 'Not found'
            })
        }

        await Brand.destroy({
            where: { id: req.params.id }
        })

        return res.status(202).json({
            message: "Muvaffaqiyatli o'chirildi"
        })
    } catch (error) {
        sendError(res, error)
    }
}

module.exports = {
    getAllBrands,
    getBrandById,
    getBrandBySearchValue,
    createBrand,
    updateBrand,
    deleteBrand
}