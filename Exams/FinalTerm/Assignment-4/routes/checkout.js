const express = require('express');
const router = express.Router();
const Checkout = require('../models/Checkout');

router.get("/order-confirmation",async (req,res) => {
    res.render("/order-confirmation");
  })

router.post('/', async (req, res) => {
  try {
    await Checkout.create({
      ...req.body,
      user: req.session.userId
    });
    res.redirect('/order-confirmation'); 
  } catch (err) {
    res.status(500).send('Checkout failed.');
  }
});

module.exports = router;
