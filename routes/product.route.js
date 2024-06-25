const {Router} = require('express')
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductBySearchValue } = require('../controllers/product.controller')
const { productValidations } = require('../middlewares/product.midlleware')

const router = Router()

// GET
router.get('/get-products', getAllProducts)
router.get('/get-product/:id', getProductById)
router.get('/get-products/search', getProductBySearchValue)

// POST
router.post('/create-product', productValidations, createProduct)

// PUT
router.put('/update-product/:id', productValidations, updateProduct)

// DELETE
router.delete('/delete-product/:id', deleteProduct)

module.exports = router