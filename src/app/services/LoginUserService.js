require("dotenv").config();
module.exports = {
  async login({ email, password }) {
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
      const token = jwt.sign(payLoad, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res
        .json({
          msg: "Login successful",
          token: token,
        })
        .status(200);
    }
  },
};
