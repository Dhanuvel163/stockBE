const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  organization: {
    ref: 'Organization',
    type: mongoose.Schema.Types.ObjectId,
  },
},{
  timestamps:true
});

const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand;