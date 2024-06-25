const { Router } = require('express')
const { getAllProductProperties, getProductPropertyById, createProductProperty, updateProductProperty, deleteProductProperty } = require('../controllers/productProperty.controller')

const router = Router()

// GET
router.get('/get-product-properties', getAllProductProperties)
router.get('/get-product-property/:id', getProductPropertyById)
// router.get('/get-product-properties/search', getPropertiesBySearchValue)
// POST
router.post('/create-product-property', createProductProperty)
// PUT
router.put('/update-product-property/:id', updateProductProperty)
// DELETE   
router.delete('/delete-product-property/:id', deleteProductProperty)

module.exports = router