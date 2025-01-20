const Salesman = require('../models/Salesman');
const {handleError} = require('../helpers/error')

exports.getSalesmans = async (req, res, next) => {
    const {id} = req.decoded
    try {
        const salesman = await Salesman.find({organization: id});
        return res.status(200).json({
            success: true,
            count: salesman.length,
            data: salesman
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.updateSalesman = async (req, res, next) => {
    const {id} = req.params
    const {id:organization} = req.decoded
    const {name,contact} = req.body
    try {
        const salesmanWithContact = await Salesman.findOne({contact,organization,_id:{$ne:id}});
        if(salesmanWithContact && !!contact) throw {is_error: true, code: 400, message: "Salesman with contact already present"}
        const salesman = await Salesman.findOne({_id:id,organization});
        if (!salesman) throw {is_error: true, code: 404, message: "Salesman not found"}
        salesman.set({name,contact});
        const update = await salesman.save();
        return res.status(200).json({
            success: true,
            data: update
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.addSalesman = async (req, res, next) => {
    try {
        const {name,contact} = req.body;
        const {id} = req.decoded;
        const salesmanWithContact = await Salesman.findOne({contact,organization:id});
        if(salesmanWithContact && !!contact) throw {is_error: true, code: 400, message: "Salesman with contact already present"}
        const salesman = await Salesman.create({name,contact,organization:id});
        return res.status(201).json({
            success: true,
            data: salesman
        })
    } catch (error) {
        handleError(error,res)
    }
}
