const HttpResponse = require("../http/httpResponse.js");
const { Room } = require("../models");
const { createRoom } = require("../services/CreateRoomService");
module.exports = {
  async create(req, res) {
    const { userId } = req;
    const { name, privater, data, password } = req.body;

    if (privater && !password)
      return HttpResponse.badRequest(
        res,
        "you need a password to create your room private"
      );

    try {
      const room = await createRoom(
        {
          name,
          privater,
          userId,
          password,
        },
        data
      );
      HttpResponse.ok(res, room);
    } catch (error) {
      HttpResponse.badRequest(res, error.message);
    }
  },
  async getRoom(req, res) {
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
