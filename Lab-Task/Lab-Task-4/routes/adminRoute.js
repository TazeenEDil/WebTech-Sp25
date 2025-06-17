const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// GET Add Product Form
router.get('/products/add', (req, res) => {
  res.render('add-product');
});

// POST Add Product
router.post('/products/add', async (req, res) => {
  const { title, price, description, image, code, material } = req.body;
  try {
    await Product.create({ title, price, description, image, code, material });
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding product");
  }
});

// GET All Products (List)
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.render('list-products', { products });
});

// GET Edit Product Form
router.get('/products/edit/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('edit-product', { product });
});

// POST Edit Product
router.post('/products/edit/:id', async (req, res) => {
  const { title, price, description, image, code, material } = req.body;
  try {
    await Product.findByIdAndUpdate(req.params.id, { title, price, description, image, code, material });
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating product");
  }
});

// GET Delete Product
router.get('/products/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product");
  }
});

module.exports = router;

/*adminRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const { isAdmin } = require('../middlewares/auth');

// Admin login simulation (use real authentication in production)
router.get('/login', (req, res) => {
  res.render('admin/login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@example.com' && password === 'admin123') {
    req.session.user = { email, isAdmin: true };
    res.redirect('/admin/products');
  } else {
    res.send('Invalid credentials');
  }
});

// Middleware for admin check
router.use(isAdmin);

// Add Product Form
router.get('/products/new', (req, res) => {
  res.render('admin/add-product');
});

// Create Product
router.post('/products', async (req, res) => {
  const { title, price, description, image } = req.body;
  await Product.create({ title, price, description, image });
  res.redirect('/admin/products');
});

// List Products
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.render('admin/list-products', { products });
});

// Edit Product Form
router.get('/products/edit/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('admin/edit-product', { product });
});

// Update Product
router.post('/products/edit/:id', async (req, res) => {
  const { title, price, description, image } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { title, price, description, image });
  res.redirect('/admin/products');
});

// Delete Product
router.post('/products/delete/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
});

// View Orders
router.get('/orders', async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.product');
  res.render('admin/orders', { orders });
});

module.exports = router;*/
