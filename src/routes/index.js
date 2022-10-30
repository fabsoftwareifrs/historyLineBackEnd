const express = require("express");
const UserController = require("../app/controllers/UserController.js");
const RoomController = require("../app/controllers/RoomController.js");
const { checkToken } = require("../app/middlewares/Auth.js");
const AuthController = require("../app/controllers/AuthController");
const gameController = require("../app/controllers/GameSatartedController");
const AttemptGame = require("../app/controllers/attemptGameController");
const routes = express.Router();

routes
  .get("/", (req, res) => res.json({ message: "Welcome to API historyLine" }))
  // Room Routes
  .get("/room", checkToken, RoomController.getAllRoom)
  .post("/room", checkToken, RoomController.create)
  .delete("/room/:id", checkToken, RoomController.delete)
  // Game Start
  .get("/game/:room_id", checkToken, gameController.started)
  // User Routes
  .get("/user/:id", UserController.getUser)
  .post("/user", UserController.store)
  .post("/user", checkToken, UserController.update)
  .post("/user/auth", AuthController.auth)
  // Return game object
  .post("/answer", AttemptGame.playerTry);
module.exports = routes;
