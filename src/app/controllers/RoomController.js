const HttpResponse = require("../http/httpResponse.js");
const { Room } = require("../models");
const { createRoom } = require("../services/CreateRoomService");
const { getAll } = require("../services/GetAllRoomService.js");
const { deleteRoom } = require("../services/DeleteRoomService.js");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async create(req, res) {
    const { userId } = req;
    const { name, privater, data } = req.body;
    try {
      const room = await createRoom(
        {
          name,
          privater,
          userId,
          password: privater ? uuidv4().split("-")[0] : null,
        },
        data
      );
      HttpResponse.ok(res, room);
    } catch (error) {
      HttpResponse.badRequest(res, error.message);
    }
  },
  async getAllRoom(req, res) {
    const userId = req.userId;
    try {
      const rooms = await getAll(userId);
      if (rooms.length === 0)
        return HttpResponse.ok(res, "Você não possui salas");
      HttpResponse.ok(res, rooms);
    } catch (error) {
      return HttpResponse.ServerError(res, error.message);
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const roomDelete = deleteRoom(id);
      HttpResponse.ok(res, roomDelete);
    } catch (error) {}
    HttpResponse.ok(res, deleteUser);
  },
  async update(req, res) {
    const { id } = req.params;
    const { name, privater, password, data } = req.body;
    if (privater && !password)
      return HttpResponse.badRequest(
        res,
        "you need a password to create your room private"
      );
    try {
      const updateRoom = await Room.update(
        { name, password: !privater ? null : password, privater, data },
        { where: { id } }
      );
      HttpResponse.ok(res, updateRoom);
    } catch (error) {
      HttpResponse.ServerError(res, error.message);
    }
  },
};
