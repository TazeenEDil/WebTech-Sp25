const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  console.log(user)
  if (!user || !user.isAdmin) {
    return res.render('login', { error: 'Unauthorized or user not found' });
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    req.session.isAdmin = true;
    res.redirect('/admin/products');
    
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
