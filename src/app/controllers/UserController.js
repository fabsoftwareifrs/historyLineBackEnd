require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { schemaStore } = require("../validation");
const { storeUser } = require("../services/CreateUserService.js");
const HttpResponse = require("../http/httpResponse.js");
const { User, Room } = require("../models/index.js");

module.exports = {
  async store(req, res) {
    const { email, name, password } = req.body;
    try {
      await schemaStore.validate(req.body);
      const userCreateToken = await storeUser({
        name,
        email,
        password,
      });
      HttpResponse.ok(res, {
        token: userCreateToken,
        authenticated: true,
      });
    } catch (error) {
      HttpResponse.badRequest(res, error.message);
    }
  },
  async getUser(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id, { include: Room });
    console.log(user);
    if (!user) {
      return res.json({ message: "Usuario não encontrada" }).status(501);
    } else {
      res.json(user);
    }
  },
  async update(req, res) {
    const { id } = req.userId;
    const { name, privater, password } = req.body;
    const data = { name, privater, password };
    try {
      const userUpdate = await User.update({ name, privater, password }, { where: { id } });
      HttpResponse.ok(res, userUpdate)
    } catch (error) {
      HttpResponse.serverError(res, error.message);
    }
    res.json(user);
  },
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const user = await User.update({ name }, { where: { id } });
    if (!user) {
      return res.json({ message: "Usuario não encontrada" }).status(501);
    } else {
 
      res.json(user);
    }
  },
};
