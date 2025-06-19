const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  address: String,
  apartment: String,
  city: String,
  postalCode: String,
  phone: String,
  cardNumber: String,
  expiry: String,
  cvv: String,
  cardName: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Checkout', checkoutSchema);
