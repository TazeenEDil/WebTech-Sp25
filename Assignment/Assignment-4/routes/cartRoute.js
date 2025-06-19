// Show cart
var express = require("express");
var router = express.Router();
const requirelogin= require("../middlewares/userMiddleware");
const Cart = require("../models/cart");
const product = require("../models/products");

router.get('/cart', async (req, res) => {
  const userId = req.session.user._id;
  const cart = await Cart.findOne({ userId }).populate('items.product');
  res.render('cart', { cartItems: cart ? cart.items : [] });
});

router.post('/cart/add', requirelogin, async (req, res) => {
  const userId = req.session.user._id;
  const { productId } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(i => i.product.toString() === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ product: productId, quantity: 1 }); 
  }

  await cart.save();
  res.redirect('/productspage');
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

// GET Checkout Page
// cartRoute.js
router.get('/checkout', requirelogin, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const cart = await Cart.findOne({ userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.redirect('/cart');
    }

    res.render('checkout', {
      cartItems: cart.items,
      user: req.session.user,
    });
  } catch (err) {
    console.error('Error fetching cart for checkout:', err);
    res.redirect('/cart');
  }
});


module.exports = router;
