const { User, Room, Data } = require("../models/index.js");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../models/index.js");
module.exports = {
  async createRoom(req, res) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decodeJwt = await jwt.decode(token);
    const { name, privater, year, data } = req.body;
    console.log(name, privater, decodeJwt.userId);
    const t = await sequelize.transaction();
    try {
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
        },
        {
          transaction: t,
        }
      );

      const newData = await Data.create(
        {
          year,
          data,
          id: newRoom.id,
          room_id: newRoom.id,
        },
        {
          include: [
            {
              model: Room,
            },
          ],
        },
        {
          transaction: t,
        }
      );

      res.send({
        message: "Sala criada com sucesso",
        newRoom,
        newData,
      });
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.log(error);
    }
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
  async getData(req, res) {
    const { id } = req.params;
    const selectData = await Room.findByPk(id, { include: Data });
    if (!selectData) {
      return res.json({ message: "Sala não encontrada" }).status(501);
    } else {
      res.json(selectData);
    }
  },
};
