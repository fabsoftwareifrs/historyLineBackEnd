const express = require("express");
const UserController = require("../app/controllers/User.js");
const RoomController = require("../app/controllers/Room.js");
const { checkToken } = require("../app/middlewares/Auth.js");
const routes = express.Router();
routes
  .get("/", (req, res) => res.json({ message: "Welcome to API historyLine" }))
  .get("/user/:id", UserController.getUser)
  .get("/room", RoomController.getAllRooms)
  .post("/room", checkToken, RoomController.create)
  .delete("/room", checkToken, RoomController.delete)
  .put("/room", checkToken, RoomController.alter)
  .post("/user", UserController.store)
  .post("/user/auth", UserController.auth);
module.exports = routes;
