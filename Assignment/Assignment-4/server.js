const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const loginRoutes = require("./routes/loginRoute");
const signupRoutes = require("./routes/signupRoute");
const homepageRoutes = require("./routes/homepageRoute");
const path = require('path');

const app = express();

// Set EJS as view engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// Express Session Middleware
app.use(session({
  secret: 'yourSecretKey', // Change this to a secure secret in production
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

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

//  Routes
app.use("/", loginRoutes);
app.use("/", signupRoutes);
app.use("/", homepageRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});