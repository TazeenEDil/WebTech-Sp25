
const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/adminMiddleware');
const Product = require('../models/product');
const Order = require('../models/order');

router.get('/products', isAdmin, async (req, res) => {
  const products = await Product.find();
  res.render('admin/list-products', { products });
});

router.get('/add-product', isAdmin, (req, res) => {
  res.render('admin/add-product');
});

router.post('/add-product', isAdmin, async (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  await Product.create({ title, price, description, imageUrl });
  res.redirect('/admin/products');
});

router.get('/edit-product/:id', isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('admin/edit-product', { product });
});

router.post('/edit-product/:id', isAdmin, async (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { title, price, description, imageUrl });
  res.redirect('/admin/products');
});

router.post('/delete-product/:id', isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
});

// View All Orders
router.get('/orders', isAdmin, async (req, res) => {
  const orders = await Order.find();
  res.render('admin/orders', { orders });
});

// Update Order Status
router.post('/orders/update/:id', isAdmin, async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.redirect('/admin/orders');
});

module.exports = router;
