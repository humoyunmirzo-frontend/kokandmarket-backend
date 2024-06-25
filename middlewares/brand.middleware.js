const { body} = require('express-validator')

const brandValidations = [
    body('name')
    .isLength({min: 3, max: 80})
    .withMessage("Brand nomi uchun 3 tadan 80 tagacha belgi kiriting"),
]

module.exports = {
    brandValidations
}