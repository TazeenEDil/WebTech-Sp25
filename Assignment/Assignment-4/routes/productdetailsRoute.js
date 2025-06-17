const express = require('express');
const router = express.Router();
const Product = require('../models/products'); // Adjust path if needed

// GET specific product details
router.get('/productdetails/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');

    res.render('productdetails', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
