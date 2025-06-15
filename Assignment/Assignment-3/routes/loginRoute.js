var express = require("express");
var router = express.Router();
const user= require("../models/user");
const bcrypt = require('bcrypt');

router.get("/login",async function(req,res){
    res.render("login");
} )


router.post("/login", async function (req, res) {
  const { email, password } = req.body;

   try {
    const current_user = await user.findOne({ email });

    if (!current_user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, current_user.password); 
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

res.redirect("/homepage");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports=router;