const jwt = require("jsonwebtoken");
module.exports = {
  async getToken(req) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decodeJwt = await jwt.decode(token);
    return decodeJwt;
  },
};
