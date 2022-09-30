const { Room, Data } = require("../models/");
const { createRoom } = require("../services/CreateRoomService");
const { getToken } = require("../hooks/getToken.js");
module.exports = {
  async create(req, res) {
    const { name, privater, data } = req.body;
    const payLoad = await getToken(req);
    const user_id = payLoad.userId;
    try {
      const RoomCreate = await createRoom({
        name,
        privater,
        user_id,
        data,
      });
      res.json({
        created: true,
        RoomName: RoomCreate.name,
      });
    } catch (error) {
      res
        .json({
          created: false,
          error: error.message,
        })
        .status(501);
    }
  },
  async getAllRooms(req, res) {
    const payLoad = await getToken(req);
    const user_id = payLoad.userId;
    const room = await Room.findAll({
      where: {
        user_id,
      },
    });
    if (!room) {
      return res.json({ message: "Sala não encontrada" }).status(501);
    } else {
      res.json(room);
    }
  },
  async delete(req, res) {
    // Delete Function ...
  },
  async alter(req, res) {
    // alter Function ...
  },
};
