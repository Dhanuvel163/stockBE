const Sale = require('../models/Sale');
const {handleError} = require('../helpers/error')

exports.getSales = async (req, res, next) => {
    const {id} = req.decoded
    try {
        const sales = await Sale.find({organization: id});
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
    const {products,shop,salesman} = req.body
    try {
        const sale = await Sale.findOne({id,organization});
        if (!sale) throw {is_error: true, code: 404, message: "Sale not found"}
        sale.set({products,shop,salesman});
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
        const {products,shop,salesman} = req.body;
        const {id} = req.decoded;
        const sale = await Sale.create({products,shop,salesman,organization:id});
        return res.status(201).json({
            success: true,
            data: sale
        })
    } catch (error) {
        handleError(error,res)
    }
}
