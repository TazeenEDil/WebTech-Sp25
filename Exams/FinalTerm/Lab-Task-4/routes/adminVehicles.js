// routes/adminVehicles.js
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');
const upload = require('../middlewares/upload');
const isAdmin = require('../middlewares/adminMiddleware');

// Show Add Vehicle form
router.get('/add', isAdmin, (req, res) => {
  res.render('admin/add-vehicle');
});

// Handle Create Vehicle
router.post('/', isAdmin, upload.single('image'), async (req, res) => {
  const { name, brand, price, type } = req.body;
  const image = req.file ? req.file.filename : '';
  await Vehicle.create({ name, brand, price, type, image });
  res.redirect('/admin/vehicles');
});

// List all vehicles (admin)
router.get('/', isAdmin, async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render('admin/list-vehicles', { vehicles });
});

// Show Edit Form
router.get('/edit/:id', isAdmin, async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render('admin/edit-vehicle', { vehicle });
});

// Update Vehicle
router.post('/edit/:id', isAdmin, upload.single('image'), async (req, res) => {
  const { name, brand, price, type } = req.body;
  const update = { name, brand, price, type };
  if (req.file) update.image = req.file.filename;
  await Vehicle.findByIdAndUpdate(req.params.id, update);
  res.redirect('/admin/vehicles');
});

// Delete Vehicle
router.post('/delete/:id', isAdmin, async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.redirect('/admin/vehicles');
});

module.exports = router;