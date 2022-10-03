require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { schemaStore } = require("../validation");
const CreateUser = require("../services/CreateUserService.js");
const HttpResponse = require("../http/httpResponse.js");
const { User, Room } = require("../models/index.js");

module.exports = {
  async store(req, res) {
    const { email, name, password } = req.body;
    try {
      await schemaStore.validate(req.body);
      const userCreateToken = await CreateUser.storeUser({
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
  async auth(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) return res.json({
        msg: "Usuário não encontrado!",
        token: "Error",
      }).status(501); 

      console.log(password, user.passwordHash)
      const decode = await bcrypt.compare(password, user.passwordHash);
      console.log(decode)
      if (!decode) return res.json({
        msg: "Falha na autenticação!",
        token: "Error",
      }).status(501); 

      

      const token = jwt.sign({userId: user.id, userName: user.name}, process.env.SECRET_KEY);

      return res.json({
          msg: "Autenticação realizada com sucesso!",
          token: token,
        }).status(200);
      
    } catch (error) {
      res.json({ msg: error.message}).status(500);
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
};
