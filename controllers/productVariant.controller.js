const database = require("../models/index")
const sendError = require("../utils/sendError.util")
const fs = require('fs')
const { validationResult } = require('express-validator')
const ProductVariant = database.product_variants
const {Op} =  require('sequelize')
// GET
const getAllProductVariants = async (req, res) => {
    try {
        const productVariants = await ProductVariant.findAll()

        res.status(200).json({
            productVariants,
            count: productVariants.length
        })
    } catch (error) {
        sendError(res, error)
    }
}

// GET BY ID
const getProductVariantById = async (req, res) => {
    try {
        const productVariant = await ProductVariant.findByPk(req.params.id)

        if (!productVariant) {
            return res.status(404).json({
                message: "Not found"
            })
        }

        res.status(200).json({
            productVariant
        })
    } catch (error) {
        sendError(res, error)
    }
}
// GET BY SEARCH VALUE
// const categories:[
//     {
//         id: 1,
//         name:"Erkaklar uchun",
//         children:[
//             {
//                 id:2,
//                 name:"Kurtkalar"
//             }
//         ]
//     },
//     {
//         id: 4,
//         name:"Ayollar uchun",
//         children:[
//             {
//                 id:2,
//                 name:"Shimlar"
//             }
//         ]
//     }
// ]
const getProductVariantsBySearchValue = async (req, res) => {
    try {
        const searchValue = req.query.name;
        const productVariants = await ProductVariant.findAll({
            where: {
                name: { [Op.iLike]: `%${searchValue}%` }
            }
        });

        return res.status(200).json({
            productVariants,
            count: productVariants.length
        });
    } catch (error) {
        sendError(res, error)
    }
};
// POST
const createProductVariant = async (req, res) => {
    try {
        const { validationResult } = require('express-validator')
        const errors = validationResult(req)
      if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                errorMessage: errors.array()[0].msg
            })
        }
        const { name, color, stock, size, price, description, categoryId, productId } = req.body;
        // const mainImageFile = req.files['mainImage'] ? req.files['mainImage'][0].filename : null;
        const imagesFiles = req.files && req.files['images'] ? req.files['images'] : [];
        const collectImagesUrls = () => {
            return imagesFiles.map(file => '/public/uploads/' + file.filename);
        };
        console.log(collectImagesUrls())

        const newProductVariant = await ProductVariant.create({
            name,
            color,
            stock,
            size,
            mainImage: '',
            images: JSON.stringify(collectImagesUrls()),
            price,
            description,
            categoryId,
            productId
        });


        res.status(201).json({
            message: "Muvaffaqiyatli qo'shildi",
            productVariant: newProductVariant
        });
    } catch (error) {
        sendError(res, error)
    }
};
// PUT
const updateProductVariant = async (req, res) => {
    try {
        const { validationResult } = require('express-validator')
        const errors = validationResult(req)
      if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                errorMessage: errors.array()[0].msg
            })
        }
        const productVariant = await ProductVariant.findByPk(req.params.id)

        if (!productVariant) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        const { name, color, stock, size, price, description, categoryId, productId } = req.body
        const mainImageFile = req.files['mainImage'] ? req.files['mainImage'][0].filename : null;
        const imagesFiles = req.files && req.files['images'] ? req.files['images'] : [];
        const collectImagesUrls = () => {
            return imagesFiles.map(file => '/public/uploads/' + file.filename);
        };
        await ProductVariant.update({
            name,
            color,
            stock,
            size,
            mainImage: mainImageFile ? '/public/uploads/' + mainImageFile : null,
            images: JSON.stringify(collectImagesUrls()),
            price,
            description,
            categoryId,
            productId
        }, {
            where: { id: req.params.id }
        })

        const updatedProductVariant = await ProductVariant.findByPk(req.params.id)

        res.status(200).json({
            message: "Muvaffaqiyatli yangilandi",
            productVariant: updatedProductVariant
        })
    } catch (error) {
        sendError(res, error)
    }
}

// DELETE
const deleteProductVariant = async (req, res) => {
    try {
        const productVariant = await ProductVariant.findByPk(req.params.id)

        if (!productVariant) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        await ProductVariant.destroy({
            where: { id: req.params.id }
        })

        res.status(202).json({
            message: "Muvaffaqiyatli o'chirildi",
        })
    } catch (error) {
        sendError(res, error)
    }
}

module.exports = {
    getAllProductVariants,
    getProductVariantById,
    getProductVariantsBySearchValue,
    createProductVariant,
    updateProductVariant,
    deleteProductVariant
}