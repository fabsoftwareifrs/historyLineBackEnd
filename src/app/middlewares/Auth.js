const jwt = require("jsonwebtoken");
require("dotenv").config();
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).end();
  }
  console.log(token);
  try {
    let decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decode);
    next();
  } catch (error) {
    console.log("n foi");
    res.status(400).json({ msg: "Token Invalido" });
  }
};
module.exports = {
  checkToken,
};
