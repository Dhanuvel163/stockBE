const Product = require('../models/Product');
const Brand = require('../models/Brand');
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

exports.getProducts = async (req, res, next) => {
    const {id} = req.decoded
    let {name,brand,in_stock} = req.body
    try {
        const brands = (await Brand.find(
            {
                organization: id,
                ...(brand ? { _id:brand } : {})
            },'_id')
        )?.map((brand)=>brand._id);
        console.log({name})
        if(name=="\\") name="\\\\"
        const products = await Product.find(
            {
                brand: {"$in":brands},
                ...(name ? { name: { $regex: new RegExp(name, "i") } } : {}),
                ...(!!in_stock ? { stock: { $gt: 0 } } : {}),
            }
        ).populate("brand");
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
    const {id:organization} = req.decoded
    const {name,brand,hsn_code,mrp,rate,cgst_percent,sgst_percent,profit_percent,rate_with_gst} = req.body
    try {
        const product = await Product.findOne({_id:id,organization});
        if (!product) throw {is_error: true, code: 404, message: "Product not found"}
        product.set({name,brand,hsn_code,mrp,rate,cgst_percent,sgst_percent,profit_percent,rate_with_gst});
        const update = await product.save();
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
        const {id} = req.decoded;
        const product = await Product.create({name,brand,hsn_code,mrp,rate,cgst_percent,sgst_percent,profit_percent,rate_with_gst,organization:id});
        return res.status(201).json({
            success: true,
            data: product
        })
    } catch (error) {
        handleError(error,res)
    }
}
