const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET);
    if (decoded) {
      req.body.userID = decoded.userID;
      req.body.author = decoded.author;
      next();
    }
  } else {
    res.status(400).send({ msg: "You are not Authorised." });
  }
};

module.exports = { auth };