const jwt = require("jsonwebtoken");
const { blacklist } = require("../Config/blacklist");
require('dotenv').config()
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
 
  if(blacklist.includes(token)){
  res.status(400).send({msg:"please login again"})
 }
 else{
  if (token) {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET);
    if (decoded) {
      
      req.body.userID = decoded.userID;
      
     
      next();
    }
  
  } else {
    res.status(400).send({ msg: "You are not Authorised." });
  }
}
};

module.exports = { auth };