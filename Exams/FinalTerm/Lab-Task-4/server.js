const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'adminsecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// Routes
app.use(require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/admin/vehicles', require('./routes/adminVehicles'));
app.use('/', require('./routes/publicVehicles'));



const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
