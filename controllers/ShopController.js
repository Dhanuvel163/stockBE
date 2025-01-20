const Shop = require('../models/Shop');
const {handleError} = require('../helpers/error')

exports.getShops = async (req, res, next) => {
    const {id} = req.decoded
    try {
        const shops = await Shop.find({organization: id});
        return res.status(200).json({
            success: true,
            count: shops.length,
            data: shops
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.updateShop = async (req, res, next) => {
    const {id} = req.params
    const {id:organization} = req.decoded
    const {name,gstin,drug_license_no,food_license_no,contact,address} = req.body
    try {
        let shopWithData = await Shop.findOne({drug_license_no,organization:id,_id:{$ne:id}});
        if(shopWithData && !!drug_license_no) throw {is_error: true, code: 400, message: "Drug License Number is already taken"}
        shopWithData = await Shop.findOne({food_license_no,organization:id,_id:{$ne:id}});
        if(shopWithData && !!food_license_no) throw {is_error: true, code: 400, message: "Food License Number is already taken"}
        const shop = await Shop.findOne({_id:id,organization});
        if (!shop) throw {is_error: true, code: 404, message: "Shop not found"}
        shop.set({name,gstin,drug_license_no,food_license_no,contact,address});
        const update = await shop.save();
        return res.status(200).json({
            success: true,
            data: update
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.addShop = async (req, res, next) => {
    try {
        const {name,gstin,drug_license_no,food_license_no,contact,address} = req.body;
        const {id} = req.decoded;
        let shopWithData = await Shop.findOne({drug_license_no,organization:id});
        if(shopWithData && !!drug_license_no) throw {is_error: true, code: 400, message: "Drug License Number is already taken"}
        shopWithData = await Shop.findOne({food_license_no,organization:id});
        if(shopWithData && !!food_license_no) throw {is_error: true, code: 400, message: "Food License Number is already taken"}
        const shop = await Shop.create({name,gstin,drug_license_no,food_license_no,contact,address,organization:id});
        return res.status(201).json({
            success: true,
            data: shop
        })
    } catch (error) {
        handleError(error,res)
    }
}
