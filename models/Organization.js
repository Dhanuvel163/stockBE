const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bill_prefix: {
    type: String,
    required: true,
    unique: true
  },
  gstin: String,
  drug_license_no: String,
  food_license_no: String,
  contact: String,
  address: {
    addr1: String,
    addr2: String,
    state: String,
    postalCode: String
  },
},{
  timestamps:true
});

OrganizationSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err); 
    user.password = hash;
    next();
  });
});

OrganizationSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const Organization = mongoose.model('Organization', OrganizationSchema);
module.exports = Organization;