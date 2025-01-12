const Superstocker = require('../models/Superstocker');
const {handleError} = require('../helpers/error')

exports.getSuperstockers = async (req, res, next) => {
    const {id} = req.decoded
    try {
        const superstocker = await Superstocker.find({organization: id});
        return res.status(200).json({
            success: true,
            count: superstocker.length,
            data: superstocker
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.updateSuperstocker = async (req, res, next) => {
    const {id} = req.params
    const {id:organization} = req.decoded
    const {name,address} = req.body
    try {
        const superstocker = await Superstocker.findOne({_id:id,organization});
        if (!superstocker) throw {is_error: true, code: 404, message: "Superstocker not found"}
        superstocker.set({name,address});
        const update = await superstocker.save();
        return res.status(200).json({
            success: true,
            data: update
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.addSuperstocker = async (req, res, next) => {
    try {
        const {name,address} = req.body;
        const {id} = req.decoded;
        const superstocker = await Superstocker.create({name,address,organization:id});
        return res.status(201).json({
            success: true,
            data: superstocker
        })
    } catch (error) {
        handleError(error,res)
    }
}
