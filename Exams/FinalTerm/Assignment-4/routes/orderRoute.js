const express = require('express');
const router = express.Router();
const requirelogin = require('../middlewares/userMiddleware');
const Cart = require('../models/cart');
const Order = require("../models/order");


router.post('/place-order', requirelogin, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const cart = await Cart.findOne({ userId }).populate('items.product');

    if (!cart || cart.items.length === 0) return res.redirect('/cart');

    const totalAmount = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount,
      createdAt: new Date(),
    });

    await newOrder.save();
    await Cart.deleteOne({ userId });

    return req.body.paymentOption === 'later'
      ? res.redirect('/order-confirmation')
      : res.redirect('/my-orders');
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).send('Something went wrong');
  }
});

router.get('/order-confirmation', async (req, res) => {
  res.render('order-confirmation');
});

router.get('/my-orders', requirelogin, async (req, res) => {
  try {
    const userId = req.session.user._id;

    const orders = await Order.find({ userId })
      .populate('items.product') // so you can access product info
      .sort({ createdAt: -1 }); // newest first

    res.render('my-orders', { orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).send('Error loading your orders.');
  }
});
module.exports = router;
