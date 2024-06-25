const {body} = require('express-validator')

const productVariantValidations = [
    body('name')
    .isLength({min: 3, max: 255})
    .withMessage('Mahsulot nomi uchun 3 tadan 255 tagacha belgi kiriting'),
    body('stock')
    .isLength({min: 1})
    .withMessage('Mahsulot sonini tanlash shart'),
    body('color')
    .isLength({min: 1})
    .withMessage('Mahsulot rangini tanlash shart'),
    body('price')
    .isLength({min: 1})
    .withMessage('Mahsulot narxini tanlash shart'),
    body('description')
    .isLength({min: 30, max: 400})
    .withMessage('Mahsulot tavsifi uchun 30 tadan 400 tagacha belgi kiriting'),
    body('categoryId')
    .isLength({min: 1})
    .withMessage('Mahsulot uchun kategoriya tanlash shart'),
    body('productId')
    .isLength({min: 1})
    .withMessage('Mahsulot qaysi mahsulot turi ekanligini tanlash shart')
]

module.exports = {
    productVariantValidations
}
