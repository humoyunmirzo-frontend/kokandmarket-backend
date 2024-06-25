const { Router } = require('express')
const { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand, getBrandBySearchValue } = require('../controllers/brand.controller')
const { brandValidations } = require('../middlewares/brand.middleware')

const router = Router()

// GET
router.get('/get-brands', getAllBrands)
router.get('/get-brand/:id', getBrandById)
router.get('/get-brands/search', getBrandBySearchValue)

// POST
router.post('/create-brand',brandValidations, createBrand)

// PUT
router.put('/update-brand/:id', brandValidations, updateBrand)

// DELETE
router.delete('/delete-brand/:id', deleteBrand)

module.exports = router