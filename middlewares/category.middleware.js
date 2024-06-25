const {check, body} = require('express-validator')

const categoryValidations = [
    body('name')
    .isLength({min: 3, max: 80})
    .withMessage("Kategoriya nomi uchun 3 tadan 80 tagacha belgi kiriting")
]

module.exports = {
    categoryValidations
}