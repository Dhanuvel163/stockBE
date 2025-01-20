const Organization = require('../models/Organization');
const {handleError} = require('../helpers/error')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET;

exports.getOrganization = async (req, res, next) => {
    const {id} = req.decoded
    try {
        const organization = await Organization.findById(id).exec();
        if (!organization) throw {is_error: true, code: 404, message: "Organization not found"}
        return res.status(200).json({
            success: true,
            data: organization
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.updateOrganization = async (req, res, next) => {
    const {id} = req.decoded
    const {name, contact, address} = req.body
    try {
        const organization = await Organization.findById(id).exec();
        if (!organization) throw {is_error: true, code: 404, message: "Organization not found"}
        organization.set({name, contact, address});
        let update = await organization.save();
        return res.status(200).json({
            success: true,
            data: update
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.createOrganization = async (req, res, next) => {
    try {
        const {
            name, email, password, bill_prefix, gstin,
            drug_license_no, food_license_no, contact, address
        } = req.body
    
        let organization = await Organization.findOne({email});
        if(organization) throw {is_error: true, code: 400, message: "Organization already present for the email"}
        organization = await Organization.findOne({bill_prefix});
        if(organization) throw {is_error: true, code: 400, message: "Bill Prefix is already taken"}
        organization = await Organization.findOne({drug_license_no});
        if(organization && !!drug_license_no) throw {is_error: true, code: 400, message: "Drug License Number is already taken"}
        organization = await Organization.findOne({food_license_no});
        if(organization && !!food_license_no) throw {is_error: true, code: 400, message: "Food License Number is already taken"}
        organization = await Organization.findOne({contact});
        if(organization) throw {is_error: true, code: 400, message: "Organization already present for the mobile number"}
        let new_organization = Organization.create({
            name, email, password, bill_prefix, gstin, drug_license_no,
            drug_license_no, food_license_no, contact, address
        });
        return res.status(200).json({
            success: true,
            data: new_organization
        })
    } catch (error) {
        handleError(error,res)
    }
}

exports.organizationLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const organization = await Organization.findOne({email});
        if (!organization) throw {is_error: true, code: 404, message: "Organization not found"}
        const validPassword = organization.comparePassword(password);
        if (!validPassword) throw {is_error: true, code: 403, message: "Authentication Failed"}
        const token = jwt.sign({organization: organization}, SECRET, {expiresIn: '7d'});
        return res.status(200).json({
            success: true,
            token: token,
            organization
        })
    } catch (error) {
        handleError(error,res)
    }
}
