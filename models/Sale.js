const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  products: [{
    product: {
      ref: 'Product',
      type: mongoose.Schema.Types.ObjectId,
    },
    sell_mrp: mongoose.Schema.Types.Number,
    sell_rate: mongoose.Schema.Types.Number,
    sell_units: mongoose.Schema.Types.Number,
    sell_free_units: mongoose.Schema.Types.Number,
    sell_cgst_percent: mongoose.Schema.Types.Number,
    sell_sgst_percent: mongoose.Schema.Types.Number,
    sell_rate_with_gst: mongoose.Schema.Types.Number,
    sell_discount_percent: mongoose.Schema.Types.Number,
    total_sell_rate: mongoose.Schema.Types.Number,
  }],
  shop: {
    ref: 'Shop',
    type: mongoose.Schema.Types.ObjectId,
  },
  salesman: {
    ref: 'Salesman',
    type: mongoose.Schema.Types.ObjectId,
  },
  organization: {
    ref: 'Organization',
    type: mongoose.Schema.Types.ObjectId,
  },
  sales_date: Date
},{
  timestamps:true
});

const Sale = mongoose.model('Sale', SaleSchema);
module.exports = Sale;