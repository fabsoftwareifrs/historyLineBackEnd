const HttpResponse = require("../http/httpResponse.js");
const { Room, Data } = require("../models");
const { createRoom } = require("../services/CreateRoomService");
module.exports = {
  async create(req, res) {
    const { name, privater, data } = req.body;
    const user_id = req.userId;
    const RoomData = {
      name,
      privater,
      user_id,
    };
    try {
      const RoomCreate = await createRoom(RoomData, data);
      HttpResponse.ok(res, RoomCreate);
    } catch (error) {
      HttpResponse.badRequest(res, error.message);
    }
  },

  async getAllRooms(req, res) {
    const user_id = req.userId;
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
