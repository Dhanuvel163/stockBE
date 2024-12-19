const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  organization: {
    ref: 'Organization',
    type: mongoose.Schema.Types.ObjectId,
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

const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;