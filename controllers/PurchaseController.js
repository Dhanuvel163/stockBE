const Purchase = require('../models/Purchase');
const {handleError} = require('../helpers/error');
const Product = require('../models/Product');
const moment = require('moment')

exports.getPurchases = async (req, res, next) => {
    const {id} = req.decoded
    const {super_stocker,purchase_date} = req.body
    try {
        const purchases = await Purchase.find({
            organization: id,
            ...(super_stocker ? { super_stocker } : {}),
            ...(purchase_date ? { purchase_date: moment(purchase_date,"YYYY-MM-DD").toDate() } : {})
        }).populate('super_stocker').populate('products.product');
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
    const {products,super_stocker,purchase_date} = req.body
    try {
        const purchase = await Purchase.findOne({_id:id,organization});
        if (!purchase) throw {is_error: true, code: 404, message: "Purchase not found"}
        await Promise.all(products.map(async(product)=>{
            const db_product = await Product.findOne({_id:product.product,organization:id})
            const prev_purchase_product = purchase.products?.find((product)=>product.product === product.product)
            if(db_product && prev_purchase_product){
                const stock = db_product.stock + product.units - prev_purchase_product.units
                db_product.set({stock});
                await db_product.save();
            }
        }))
        purchase.set({products,super_stocker,purchase_date});
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
        const {products,super_stocker,purchase_date} = req.body;
        const {id} = req.decoded;
        const purchase = await Purchase.create({products,super_stocker,organization:id,purchase_date});
        await Promise.all(products.map(async(product)=>{
            const db_product = await Product.findOne({_id:product.product,organization:id})
            if(db_product){
                const stock = db_product.stock + product.units
                db_product.set({stock});
                await db_product.save();
            }
        }))
        return res.status(201).json({
            success: true,
            data: purchase
        })
    } catch (error) {
        handleError(error,res)
    }
}
