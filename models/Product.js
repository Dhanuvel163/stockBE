const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    ref: 'Brand',
    type: mongoose.Schema.Types.ObjectId,
  },
  hsn_code: String,
  mrp: mongoose.Schema.Types.Number,
  rate: mongoose.Schema.Types.Number,
  cgst_percent: mongoose.Schema.Types.Number,
  sgst_percent: mongoose.Schema.Types.Number,
  rate_with_gst: mongoose.Schema.Types.Number,
  profit_percent: mongoose.Schema.Types.Number,
  stock: {
    default: 0,
    type: mongoose.Schema.Types.Number,
  },
  organization: {
    ref: 'Organization',
    type: mongoose.Schema.Types.ObjectId,
  },
},{
  timestamps:true
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;