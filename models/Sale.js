const mongoose = require('mongoose');
const Counter = require('./Counter');
const Organization = require('./Organization');

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

SaleSchema.pre('save', async function (next) {
  const doc = this;
  try {
    const organization = await Organization.findOne({_id: doc.organization?.toString()})
    const counter = await Counter.findByIdAndUpdate({ _id: doc.organization?.toString() }, { $inc: { seq: 1 } }, { new: true, upsert: true })
    doc.invoice = `${organization.bill_prefix}${counter.seq}`;
    next();
  } catch (error) {
    return next(error);
  }
});

const Sale = mongoose.model('Sale', SaleSchema);
module.exports = Sale;