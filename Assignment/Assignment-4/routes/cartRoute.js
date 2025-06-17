// Show cart
var express = require("express");
var router = express.Router();
const requirelogin= require("../middlewares/userMiddleware");
const Cart = require("../models/cart");
const Product = require("../models/product");

router.get('/cart', async (req, res) => {
  const userId = req.session.user._id;
  const cart = await Cart.findOne({ userId }).populate('items.product');
  res.render('cart', { cartItems: cart ? cart.items : [] });
});

// Update quantity
router.post('/cart/update', async (req, res) => {
  const { productId, action } = req.body;
  const cart = await Cart.findOne({ userId: req.session.user._id });

  const item = cart.items.find(i => i.product.toString() === productId);
  if (item) {
    if (action === 'increase') item.quantity++;
    if (action === 'decrease' && item.quantity > 1) item.quantity--;
    await cart.save();
  }

  res.redirect('/cart');
});

// Remove product
router.post('/cart/remove', async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ userId: req.session.user._id });
  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();

  res.redirect('/cart');
});
