const { body} = require('express-validator')

const propertyValidations = [
    body('name')
    .isLength({min: 3, max: 100})
    .withMessage("Xususiyat nomi uchun 3 tadan 100 tagacha belgi kiriting"),
]

module.exports = {
    propertyValidations
}