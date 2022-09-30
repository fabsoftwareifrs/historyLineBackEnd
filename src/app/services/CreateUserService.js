require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");
module.exports = {
  async storeUser({ name, email, password }) {
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    try {
      const newUser = await User.create({
        name,
        email,
        passwordHash,
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
