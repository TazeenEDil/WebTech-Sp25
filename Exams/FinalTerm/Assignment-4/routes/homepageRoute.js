var express = require("express");
var router = express.Router();
const requirelogin= require("../middlewares/userMiddleware");

router.get("/", (req, res) => {
  res.render("homepage", { user: req.session.user });
});


module.exports=router;