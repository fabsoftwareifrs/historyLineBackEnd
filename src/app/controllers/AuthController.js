const HttpResponse = require("../http/httpResponse.js");
const { User } = require("../models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
  async auth(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) return HttpResponse.badRequest(res, "Usuario não encontrado");

      const passwordVerif = await bcrypt.compare(password, user.passwordHash);
      if (!passwordVerif)
        return HttpResponse.badRequest(
          res,
          "Falha na autenticação, usuario ou senha invalidos"
        );

      const token = jwt.sign(
        { userId: user.id, userName: user.name },
        process.env.SECRET_KEY
      );

      return res
        .json({
          msg: "Autenticação realizada com sucesso!",
          token: token,
        })
        .status(200);
    } catch (error) {
      res.json({ msg: error.message }).status(500);
    }
  },
};
