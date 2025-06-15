var express = require("express");
var router = express.Router();


router.get("/homepage",async function(req,res){
    res.render("homepage");
} );

module.exports=router;