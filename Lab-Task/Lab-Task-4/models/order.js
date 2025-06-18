
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  items: Array,
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', orderSchema);
