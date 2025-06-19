const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const bcrypt= require("bcrypt");
const path = require("path");

const loginRoutes = require("./routes/loginRoute");
const signupRoutes = require("./routes/signupRoute");
const homepageRoutes = require("./routes/homepageRoute");
const productspageRoutes = require("./routes/productsRoute");
const cartpageRoutes = require("./routes/cartRoute");
const authMiddleware = require("./middlewares/userMiddleware");

const Cart = require('./models/cart');
const user = require('./models/user');
const checkoutRoutes = require('./routes/checkout');
const orderRoutes=require("./routes/orderRoute");


const app = express();



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded({ extended: true }));



// Static files
app.use(express.static("public"));

// Session middleware
app.use(session({
  secret: 'yourSecretKey',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

// Flash messages
app.use(flash());

// Make flash messages available in views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.danger = req.flash("danger");
  next();
});

// Inject user and cart count in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use(async (req, res, next) => {
  if (req.session.user) {
    try {
      const cart = await Cart.findOne({ userId: req.session.user._id });
      const cartCount = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
      res.locals.cartCount = cartCount;
    } catch (err) {
      console.error('Error getting cart count:', err);
      res.locals.cartCount = 0;
    }
  } else {
    res.locals.cartCount = 0;
  }
  next();
});


// MongoDB Connection
const mongoURI = "mongodb+srv://tazeenedil470:iCfOuQOWxJNlt6GX@test-cluster.m1j6glv.mongodb.net/test?retryWrites=true&w=majority&appName=Test-cluster";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB Atlas");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Routes
app.use("/", loginRoutes);
app.use("/", signupRoutes);
app.use("/", homepageRoutes);
app.use("/", productspageRoutes);
app.use("/", authMiddleware, cartpageRoutes);
app.use('/checkout', checkoutRoutes);
app.use("/", orderRoutes);
// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});