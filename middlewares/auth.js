const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/User");

async function auth(req, res, next) {
  let token;
 
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]; 
    
}
    if(!token){
      return res.json({errorMsg: "You are not authorized to use this route"})
    }
  
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if(!user) return res.json({errorMsg: "No user found"})
    req.user = user;
    next();  
  }
  catch (ex) {
    res.json({errorMsg: "Invalid token"});
    console.log(ex);
  }
  
}

module.exports = auth;
