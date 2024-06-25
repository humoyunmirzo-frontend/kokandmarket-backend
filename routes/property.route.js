const { Router } = require('express')
const { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty, getPropertiesBySearchValue } = require('../controllers/property.controller')
const { propertyValidations } = require('../middlewares/property.middleware')

const router = Router()

// GET
router.get('/get-properties', getAllProperties)
router.get('/get-property/:id', getPropertyById)
router.get('/get-properties/search', getPropertiesBySearchValue)
// POST
router.post('/create-property', propertyValidations, createProperty)
// PUT
router.put('/update-property/:id', propertyValidations, updateProperty)
// DELETE   
router.delete('/delete-property/:id', deleteProperty)

module.exports = router