const Product = require('../models/Product');
const {handleError} = require('../helpers/error')

exports.getProductsByBrand = async (req, res, next) => {
    const {brand} = req.params
    try {
        const products = await Product.find({brand});
        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.updateProductById = async (req, res, next) => {
    const {id} = req.params
    const {name,brand,hsn_code,mrp,rate,cgst_percent,sgst_percent,profit_percent,rate_with_gst} = req.body
    try {
        const product = await Product.findOne({id});
        if (!product) throw {is_error: true, code: 404, message: "Product not found"}
        product.set({name,brand,hsn_code,mrp,rate,cgst_percent,sgst_percent,profit_percent,rate_with_gst});
        const update = await brand.save();
        return res.status(200).json({
            success: true,
            data: update
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.addProduct = async (req, res, next) => {
    try {
        const {name,brand,hsn_code,mrp,rate,cgst_percent,sgst_percent,profit_percent,rate_with_gst} = req.body;
        const product = await Product.create({name,brand,hsn_code,mrp,rate,cgst_percent,sgst_percent,profit_percent,rate_with_gst});
        return res.status(201).json({
            success: true,
            data: product
        })
    } catch (error) {
        handleError(error,res)
    }
}
