const { body } = require('express-validator')

const productValidations = [
    body('name')
        .isLength({ min: 2, max: 155 })
        .withMessage("Mahsulot nomi uchun 2 tadan 155 tagacha belgi kiriting"),
    body('categoryId')
        .isLength({ min: 1 })
        .withMessage("Mahsulot uchun kategoriya tanlash shart!"),
    body('brandId')
        .isLength({ min: 1 })
        .withMessage("Mahsulot uchun brand tanlash shart!"),
]

module.exports = {
    productValidations
}