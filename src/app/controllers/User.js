const { schemaStore } = require("../validate");
const CreateUser = require("../services/CreateUserService.js");
module.exports = {
  async store(req, res) {
    await schemaStore.validate(req.body);
    const { email, name, password } = req.body;
    try {
      const userCreateToken = await CreateUser.storeUser({
        name,
        email,
        password,
      });
      res.json({
        token: userCreateToken,
        authenticated: true,
      });
    } catch (error) {
      res
        .json({
          error: error,
          authenticated: false,
        })
        .status(401);
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
      if (user.password === password) {
        const payLoad = {
          userId: user.id,
          userName: user.name,
        };
        const token = jwt.sign(payLoad, "cuslargos");
        res
          .json({
            msg: "Login successful",
            token: token,
          })
          .status(200);
      }
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
