const { User, Room } = require("../models/index.js");
const jwt = require("jsonwebtoken");

module.exports = {
  async createRoom(req, res) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decodeJwt = await jwt.decode(token);
    const { name, privater } = req.body;

    const newRoom = await Room.create(
      {
        name,
        privater,
        user_id: decodeJwt.userId,
      },
      {
        include: [
          {
            model: User,
          },
        ],
      }
    );
  },
  async getRoom(req, res) {
    const { id } = req.params;
    const room = await Room.findByPk(id, { include: User });
    if (!room) {
      return res.json({ message: "Sala não encontrada" }).status(501);
    } else {
      res.json(room);
    }
  },
};
