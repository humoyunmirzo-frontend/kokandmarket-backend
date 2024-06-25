const database = require('../models/index')
const sendError = require('../utils/sendError.util')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

const path = require('path')
const fs = require('fs')
const Category = database.categories

// GET
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll()
        const categoriesCount = categories.length

        return res.status(200).json({
            categories,
            count: categoriesCount
        })
    } catch (error) {
        sendError(res, error)
    }
}

// GET BY ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id)

        if (!category) {
            return res.status(404).json({
                message: "Not found"
            })
        }

        res.status(200).json({
            category
        })
    } catch (error) {
        sendError(res, error)
    }
}
// GET BY SEARCH VALUE

const getCategoryBySearchValue = async (req, res) => {
    try {
        const searchValue = req.query.name;
        const categories = await Category.findAll({
            where: {
                name: { [Op.iLike]: `%${searchValue}%` }
            }
        });

        return res.status(200).json({
            categories,
            count: categories.length
        });
    } catch (error) {
        sendError(res, error)
    }
};
// GET BY PARENT ID

const getCategoriesGroup = async (req, res) => {
    try {
        function buildCategoriesGroup(categories, parentId = null) {
            const categoriesGroup = [];
            categories.forEach(category => {
                if (category.parentId === parentId) {
                    const children = buildCategoriesGroup(categories, category.id);
                    const categoryWithChildren = {
                        id: category.id,
                        name: category.name,
                        parentId: category.parentId,
                        imageUrl: category.imageUrl,
                        children: children
                    };
                    categoriesGroup.push(categoryWithChildren);
                }
            });

            return categoriesGroup;
        };

        const categories = await Category.findAll({
            raw: true
        });
        const categoriesGroup = buildCategoriesGroup(categories);
        res.status(200).json({
            categories: categoriesGroup
        });
    } catch (error) {
        sendError(res, error);
    }
};

// GET CHILDREN CATEGORIES
const getChildrenCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: {
                parentId: {
                    [Op.ne]: null
                }
            }
        })
        console.log(categories);

        res.status(200).json({
            categories
        })
    } catch (error) {
        sendError(res, error)
    }
}

// POST
const createCategory = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                errorMessage: errors.array()[0].msg
            })
        }
        let { name, parentId } = req.body
        const imageUrl = req.file ? req.file.filename : ''
        if (parentId === "null") {
            parentId = null;
        } else if (parentId) {
            parentId = parseInt(parentId, 10);
            if (isNaN(parentId)) {
                return res.status(400).json({
                    success: false,
                    message: "Bosh kategoriya tanlanmagan"
                });
            }
        }
        const newCategory = await Category.create({ name, imageUrl, parentId })
        return res.status(201).json({
            message: "Muvaffaqiyatli qo'shildi",
            category: newCategory
        })
    } catch (error) {
        sendError(res, error)
    }
}

// PUT
const updateCategory = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                errorMessage: errors.array()[0].msg
            })
        }
        const category = await Category.findByPk(req.params.id)
        if (!category) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        let { name, parentId } = req.body
        const imageUrl = req.file ? req.file.filename : ''
        if (parentId === "null") {
            parentId = null;
        } else if (parentId) {
            parentId = parseInt(parentId, 10);
            if (isNaN(parentId)) {
                return res.status(400).json({
                    success: false,
                    message: "Bosh kategoriya tanlanmagan"
                });
            }
        }
        await Category.update({ name, imageUrl, parentId }, {
            where: { id: req.params.id }
        })

        const updatedCategory = await Category.findByPk(req.params.id)

        res.status(200).json({
            message: 'Muvaffaqiyatli yangilandi',
            category: updatedCategory
        })
    } catch (error) {
        sendError(res, error)
    }
}

// DELETE

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id)
        if (!category) {
            return res.status(404).json({
                message: "Not found"
            })
        }

        await Category.destroy({
            where: { id: req.params.id }
        })
        res.status(202).json({
            message: "Muvaffaqiyatli o'chirildi",
        })
    } catch (error) {
        sendError(res, error)
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryBySearchValue,
    getCategoriesGroup,
    getChildrenCategories,
    createCategory,
    updateCategory,
    deleteCategory
}