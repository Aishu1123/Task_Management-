const jwt = require("jsonwebtoken");
require('dotenv').config()
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (token) {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET);
    if (decoded) {
      
      req.body.userID = decoded.userID;
      console.log(req.body.userID)
     
      next();
    }
  
  } else {
    res.status(400).send({ msg: "You are not Authorised." });
  }
};

module.exports = { auth };