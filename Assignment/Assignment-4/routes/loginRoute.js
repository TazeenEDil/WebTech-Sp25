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
    req.session.user = {
    _id: current_user._id,
     email: current_user.email,
    
  };

res.redirect("/");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports=router;