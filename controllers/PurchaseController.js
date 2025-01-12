const Purchase = require('../models/Purchase');
const {handleError} = require('../helpers/error')

exports.getPurchases = async (req, res, next) => {
    const {id} = req.decoded
    try {
        const purchases = await Purchase.find({organization: id});
        return res.status(200).json({
            success: true,
            count: purchases.length,
            data: purchases
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.updatePurchase = async (req, res, next) => {
    const {id} = req.params
    const {id:organization} = req.decoded
    const {products,super_stocker} = req.body
    try {
        const purchase = await Purchase.findOne({_id:id,organization});
        if (!purchase) throw {is_error: true, code: 404, message: "Purchase not found"}
        purchase.set({products,super_stocker});
        const update = await purchase.save();
        return res.status(200).json({
            success: true,
            data: update
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.addPurchase = async (req, res, next) => {
    try {
        const {products,super_stocker} = req.body;
        const {id} = req.decoded;
        const purchase = await Purchase.create({products,super_stocker,organization:id});
        return res.status(201).json({
            success: true,
            data: purchase
        })
    } catch (error) {
        handleError(error,res)
    }
}
