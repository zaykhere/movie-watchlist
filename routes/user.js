const express = require("express");
const router = express.Router();
const ValidateRegisterInput = require("../validation/register");
const ValidateLoginInput = require("../validation/login");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

// Create User 
router.post('/create-account', async(req, res) => {
  //Validation 
  const { errors, isValid } = ValidateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
   }
  try {
    const ifUser = await User.findOne({email:req.body.email });
    if (ifUser) return res.status(500).json({errorMsg: "email already exists"});
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    let result = await user.save();
    const token = user.generateAuthToken();
    //res.cookie('loginCookie', token,{ maxAge: 90000000 , httpOnly: false, sameSite: "none", secure: false})
    //.json({name: result.name , email: result.email});
    res.json({email:result.email,token: token})
  } catch (error) {
    console.log(error);
    res.status(500)
    .json({errorMsg:"Error, something went wrong"});
  }
})

//Logout User 
router.get("/logout", auth, async (req, res) => {
  if (req.cookies.loginCookie) {
     res.clearCookie('loginCookie');
     res.send("logout successfuly");
  }
})

//Logged In
router.get("/loggedin", auth, (req, res) => {
  if(typeof req.user==='undefined'){
    res.json({success: 'logged in'})
  }
  else {
    res.json({errorMsg: "Authentication error"})
  }
});

//User Login 
router.post("/sign-in", async (req, res) => {
   const { errors, isValid } = ValidateLoginInput(req.body);
   if (!isValid) {
    return res.status(400).json({errorMsg: errors});
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("No user with this email exists");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.json({errorMsg: "Invalid email or password"});
    const token = user.generateAuthToken();
    res.json({success:'true',token:token});

  } catch (error) {
    console.log(error);
    res.status(500).json({errorMsg: "something went wrong"});
  }
})

//Forgot password
router.post("/forgot",async(req,res)=>{
  const {email} = req.body;
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.json({errorMsg: 'Email could not be sent'})
    }
    const resetToken = user.generateResetToken();
    await user.save();

    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
    const message = `
    <h1> You have requested the password reset </h1>
    <p> Please visit this link to reset your password </p>
    <a href=${resetUrl} clicktracking=off> ${resetUrl} </a>
    `
    try{

    }
    catch(ex){
      
    }
  }
  catch(ex){
    console.log(ex);
  }
})


module.exports = router;
