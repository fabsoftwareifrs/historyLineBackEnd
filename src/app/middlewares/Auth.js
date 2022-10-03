const jwt = require("jsonwebtoken");
require("dotenv").config();
const checkToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).end();
  }
  try {
    const accessToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = accessToken.userId;
    req.userId = userId;

    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid Token !!" }).status(501).end();
  }
};
module.exports = {
  checkToken,
};
