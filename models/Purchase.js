const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  products: [{
    product: {
      ref: 'Product',
      type: mongoose.Schema.Types.ObjectId,
    },
    mrp: mongoose.Schema.Types.Number,
    rate: mongoose.Schema.Types.Number,
    units: mongoose.Schema.Types.Number,
    cgst_percent: mongoose.Schema.Types.Number,
    sgst_percent: mongoose.Schema.Types.Number,
    rate_with_gst: mongoose.Schema.Types.Number,
  }],
  super_stocker: {
    ref: 'Superstocking',
    type: mongoose.Schema.Types.ObjectId,
  },
  organization: {
    ref: 'Organization',
    type: mongoose.Schema.Types.ObjectId,
  },
  purchase_date: Date
},{
  timestamps:true
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);
module.exports = Purchase;