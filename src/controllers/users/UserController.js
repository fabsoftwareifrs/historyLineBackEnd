import User from "../../models/User.js";
import { schemaStore, schemaAuth } from "./SchemaValidator.js";
import jwt from "jsonwebtoken";

export default {
  async store(req, res) {
    try {
      await schemaStore.validate(req.body);
      
      // Cadastro no banco de dados
      const { name, email, password_hash } = req.body;
      const user = await User.create({
        name,
        email,
        password_hash,
      });

      // Cria o jwt
      const play_load = {
        username: user.name,
        id: user.id,
      };
      const token = jwt.sign(play_load, process.env.JWT_HASH, {
        expiresIn: "1h",
      });



      res.status(200).json({
        success: true,
        message: "Logged Success!",
        token: "Bearer " + token,
      });


    } catch (error) {
      return res.json(error.message).status(501);
    }
  },
  async getUser(req, res) {
    const name = req.params.id;

    const userQuery = await User.findOne({
      attributes: { exclude: ["password_hash", "createdAt", "updatedAt"] },
      where: {
        name,
      },
    });
    if (!userQuery) {
      return res
        .json({
          massage: "Usuario Inesistente",
        })
        .status(501);
    }
    res.json(userQuery);
  },

  async auth(req, res) {
    try {
      await schemaAuth.validate(req.body);
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (password == user.password_hash) {
        const play_load = {
          username: user.name,
          id: user.id,
        };
        const token = jwt.sign(play_load, process.env.JWT_HASH, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: "Logged Success!",
          token: "Bearer " + token,
        });
      } else {
        res.status(500).json({ error: "Error: password incorrect" });
      }
    } catch (error) {
      return res.json(error.errors).status(501);
    }
  },
};
