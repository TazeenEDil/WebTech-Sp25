const express = require("express");
const mongoose= require("mongoose");
const session= require("express-session");
const bcrypt= require("bcrypt");
const loginRoutes= require("./routes/loginRoute")
const signupRoutes= require("./routes/signupRoute")
const homepageRoutes= require("./routes/homepageRoute")
let app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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
app.use(express.static("public"));

//routes
app.use("/",loginRoutes);
app.use("/",signupRoutes);
app.use("/",homepageRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

