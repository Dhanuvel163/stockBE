const mongoose = require('mongoose');
const Counter = require('./Counter');

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
    profit_percent: mongoose.Schema.Types.Number,
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
  sales_date: Date,
  total_sell_rate: mongoose.Schema.Types.Number,
  total_discount: mongoose.Schema.Types.Number,
  net_total_sell_rate: mongoose.Schema.Types.Number,
  invoice: mongoose.Schema.Types.String,
},{
  timestamps:true
});

SaleSchema.pre('save', function (next) {
  const doc = this;
  Counter.findByIdAndUpdate({ _id: doc.organization }, { $inc: { seq: 1 } }, { new: true, upsert: true })
    .then(function (counter) {
      doc.invoice = counter.seq;
      next();
    })
    .catch(function (error) {
      return next(error);
    });
});

const Sale = mongoose.model('Sale', SaleSchema);
module.exports = Sale;