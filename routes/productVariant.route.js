const {Router} = require('express')
const { getAllProductVariants, getProductVariantById, createProductVariant, updateProductVariant, deleteProductVariant, getProductVariantsBySearchValue } = require('../controllers/productVariant.controller')
const upload = require('../utils/fileUpload.util')
const { productVariantValidations } = require('../middlewares/productVariant.middleware')

const router = Router()

// GET
router.get('/get-product-variants', getAllProductVariants)
router.get('/get-product-variant/:id', getProductVariantById)
router.get('/get-product-variants/search', getProductVariantsBySearchValue)

// POST
router.post('/create-product-variant', upload.fields([{ name: 'mainImage' }, { name: 'images'}]),  createProductVariant);
// PUT
router.put('/update-product-variant/:id',  upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'images', maxCount: 3 }]), productVariantValidations, updateProductVariant)

// DELETE
router.delete('/delete-product-variant/:id', deleteProductVariant)

module.exports = router