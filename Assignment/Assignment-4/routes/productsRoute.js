var express = require("express");
var router = express.Router();
const bcrypt= require("bcrypt");
const user= require("../models/user")


const Product = require("../models/products");

router.get("/productspage", async function(req, res) {
  try {
    const products = await Product.find(); 
    res.render('productspage', { products, user: req.user || null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports=router;