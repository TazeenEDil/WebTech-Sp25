var express = require("express");
var router = express.Router();
const bcrypt= require("bcrypt");
const user= require("../models/user")


router.get("/register",async function(req,res){
    res.render("signup");
} )

router.post("/register", async function(req, res) {
  const { name, email, password } = req.body;

  try {
    const existing = await user.findOne({ email });
    if (existing) {
      return res.status(400).send("Email already registered");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ name, email, password: hashPassword });
    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send("Registration failed");
  }
});

module.exports=router;