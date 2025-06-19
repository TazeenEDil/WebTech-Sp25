const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String, // This will store the bcrypt-hashed password
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
