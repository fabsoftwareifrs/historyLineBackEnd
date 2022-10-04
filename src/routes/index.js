const express = require("express");
const UserController = require("../app/controllers/UserController.js");
const RoomController = require("../app/controllers/RoomController.js");
const { checkToken } = require("../app/middlewares/Auth.js");
const AuthController  = require("../app/controllers/AuthController");
const routes = express.Router();

routes
  .get("/", (req, res) => res.json({ message: "Welcome to API historyLine" }))
  .get("/user/:id", UserController.getUser)
  .get("/room", checkToken, RoomController.getAllRoom)
  .post("/room", checkToken, RoomController.create)
  .delete("/room/:id", checkToken, RoomController.delete)
  .post("/user", UserController.store)
  .post("/user/auth", AuthController.auth);
module.exports = routes;
