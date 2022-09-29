require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, Room } = require("../models/index.js");
module.exports = {
  async storeUser(name, email, password) {
    console.log("qwe");
    try {
      const newUser = await User.create({
        name,
        email,
        password,
      });
      const payLoad = {
        userId: newUser.id,
        userName: newUser.name,
      };
      const token = jwt.sign(payLoad, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      return token;
    } catch (error) {
      throw new Error(error);
    }
  },
};
