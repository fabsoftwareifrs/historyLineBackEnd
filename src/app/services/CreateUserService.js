require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, Room } = require("../models/index.js");
const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  async storeUser(name, email, passwordHash) {
    try {
      const newUser = await User.create({ name, email, passwordHash });
      const payLoad = {
        userId: newUser.id,
        userName: newUser.name,
      };
      const token = jwt.sign(payLoad, process.env.SECRET_KEY, {
        expiresIn: 400,
      });
      return token;
    } catch (error) {
      console.log(error);
      throw new Error(error.menssage);
    }
  },
};
