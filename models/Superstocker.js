const mongoose = require('mongoose');

const SuperstockerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  organization: {
    ref: 'Organization',
    type: mongoose.Schema.Types.ObjectId,
  },
  address: String,
},{
  timestamps:true
});

const Superstocker = mongoose.model('Superstocker', SuperstockerSchema);
module.exports = Superstocker;