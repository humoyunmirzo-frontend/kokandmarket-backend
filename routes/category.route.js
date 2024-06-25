const { Router } = require('express')
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, getCategoryBySearchValue, getCategoriesGroup, getChildrenCategories } = require('../controllers/category.controller')
const upload = require('../utils/fileUpload.util')
const { categoryValidations } = require('../middlewares/category.middleware')

const router = Router()

// GET
router.get('/get-categories', getAllCategories)
router.get('/get-category/:id', getCategoryById)
router.get('/get-categories/search', getCategoryBySearchValue)
router.get('/get-categories-group', getCategoriesGroup)
router.get('/get-categories-children', getChildrenCategories)

// POST
router.post('/create-category', upload.single("imageUrl"), categoryValidations, createCategory)

// PUT
router.put('/update-category/:id', upload.single("imageUrl"), categoryValidations, updateCategory)

// DELETE
router.delete('/delete-category/:id', deleteCategory)

module.exports = router