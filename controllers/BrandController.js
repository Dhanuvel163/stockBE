const Brand = require('../models/Brand');
const {handleError} = require('../helpers/error')

exports.getBrands = async (req, res, next) => {
    const {id} = req.decoded
    try {
        const brands = await Brand.find({organization: id});
        return res.status(200).json({
            success: true,
            count: brands.length,
            data: brands
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.updateBrand = async (req, res, next) => {
    const {id} = req.params
    const {id:organization} = req.decoded
    const {name} = req.body
    try {
        const brandWithName = await Brand.findOne({name:{ $regex : new RegExp(name, "i") },organization,_id:{$ne:id}});
        if(brandWithName) throw {is_error: true, code: 400, message: "Brand name already present"}
        const brand = await Brand.findOne({_id:id,organization});
        if (!brand) throw {is_error: true, code: 404, message: "Brand not found"}
        brand.set({name});
        const update = await brand.save();
        return res.status(200).json({
            success: true,
            data: update
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.addBrand = async (req, res, next) => {
    try {
        const {name} = req.body;
        const {id} = req.decoded;
        const brandWithName = await Brand.findOne({name:{ $regex : new RegExp(name, "i") },organization:id});
        if(brandWithName) throw {is_error: true, code: 400, message: "Brand already present"}
        const brand = await Brand.create({name,organization:id});
        return res.status(201).json({
            success: true,
            data: brand
        })
    } catch (error) {
        handleError(error,res)
    }
}
