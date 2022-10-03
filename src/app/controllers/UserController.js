const { schemaStore } = require("../validation");
require("dotenv").config();
const CreateUser = require("../services/CreateUserService.js");
const HttpResponse = require("../http/httpResponse.js");
const { User, Room } = require("../models/index.js");
const jwt = require("jsonwebtoken");
module.exports = {
  async store(req, res) {
    const { email, name, password } = req.body;
    try {
      await schemaStore.validate(req.body);
      const userData = {
        name,
        email,
        password,
      };
      const userCreateToken = await CreateUser.storeUser(userData);
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
        where: {
          email,
        },
      });
      let password = bcrypt.verify(password, process.env.SECRET_KEY);
      if (decode) {
        const payLoad = {
          userId: user.id,
          userName: user.name,
        };
        const token = jwt.sign(payLoad, process.env.SECRET_KEY);
        res
          .json({
            msg: "Login successful",
            token: token,
          })
          .status(200);
      }
      res
        .json({
          msg: "Senha ou email incorretos",
          token: "Error",
        })
        .status(501);
    } catch (error) {
      res
        .json({
          msg: error.message,
        })
        .status(500);
    }
  },
  async getUser(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id, { include: Room });
    console.log(user);
    if (!user) {
      return res.json({ message: "Sala não encontrada" }).status(501);
    } else {
      res.json(user);
    }
  },
};
