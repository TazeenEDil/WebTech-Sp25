var express = require("express");
var router = express.Router();
const bcrypt= require("bcrypt");
const user= require("../models/user")


router.get("/register",async function(req,res){
    res.render("signup");
} )

router.post("/register", async function(req,res){
    const {name,email,password} = req.body;
   
const hashPassword = await bcrypt.hash(password, 10);
 const newUser= new user({name,email,password:hashPassword});
 await newUser.save();
 res.redirect("/login");
})
module.exports=router;