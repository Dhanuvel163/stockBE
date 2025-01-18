const Sale = require('../models/Sale');
const {handleError} = require('../helpers/error');
const Product = require('../models/Product');
const moment = require('moment')

exports.getSales = async (req, res, next) => {
    const {id} = req.decoded
    const {shop,sales_date,salesman} = req.body
    try {
        const sales = await Sale.find({
            organization: id,
            ...(shop ? { shop } : {}),
            ...(salesman ? { salesman } : {}),
            ...(sales_date ? { sales_date: moment(sales_date,"YYYY-MM-DD").toDate() } : {})
        }).populate('shop').populate('salesman')
        .populate('organization').populate('products.product');
        return res.status(200).json({
            success: true,
            count: sales.length,
            data: sales
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.updateSale = async (req, res, next) => {
    const {id} = req.params
    const {id:organization} = req.decoded
    const {products,shop,salesman,sales_date,total_discount,total_sell_rate} = req.body
    try {
        const sale = await Sale.findOne({_id:id,organization});
        if (!sale) throw {is_error: true, code: 404, message: "Sale not found"}
        await Promise.all(products.map(async(product)=>{
            const db_product = await Product.findOne({_id:product.product,organization:id})
            const prev_sale_product = sale.products?.find((prod)=>prod.product === product.product)
            if(db_product && prev_sale_product){
                const stock = parseInt(db_product.stock) - parseInt(product.sell_units || 0) + parseInt(prev_sale_product.sell_units) - parseInt(product.sell_free_units || 0) + parseInt(prev_sale_product.sell_free_units)
                db_product.set({stock});
                await db_product.save();
            }
        }))
        sale.set({products,shop,salesman,sales_date,total_discount,total_sell_rate});
        const update = await sale.save();
        return res.status(200).json({
            success: true,
            data: update
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.addSale = async (req, res, next) => {
    try {
        const {products,shop,salesman,sales_date,total_discount,total_sell_rate} = req.body;
        const {id} = req.decoded;
        const sale = await Sale.create({products,shop,salesman,organization:id,sales_date,total_discount,total_sell_rate});
        await Promise.all(products.map(async(product)=>{
            const db_product = await Product.findOne({_id:product.product,organization:id})
            if(db_product){
                const stock = parseInt(db_product.stock) - parseInt(product.sell_units || 0) - parseInt(product.sell_free_units || 0)
                db_product.set({stock});
                await db_product.save();
            }
        }))
        return res.status(201).json({
            success: true,
            data: sale
        })
    } catch (error) {
        handleError(error,res)
    }
}
