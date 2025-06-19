const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');

router.get('/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render('list-vehicles', { vehicles });
});

module.exports = router;
