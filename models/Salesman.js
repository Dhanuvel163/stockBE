const mongoose = require('mongoose');

const SalesmanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: String,
  organization: {
    ref: 'Organization',
    type: mongoose.Schema.Types.ObjectId,
  },
},{
  timestamps:true
});

const Salesman = mongoose.model('Salesman', SalesmanSchema);
module.exports = Salesman;