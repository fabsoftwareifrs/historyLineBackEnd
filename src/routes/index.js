const express = require("express");
const UserController = require("../app/controllers/User.js");
const RoomController = require("../app/controllers/Room.js");
const passport = require("passport");
const { checkToken } = require("../app/middlewares/Auth.js");
const routes = express.Router();
routes
  .get("/", (req, res) =>
    res.json({ mensage: "Seja bem vindo a API da bolsa" })
  )
  .get("/user/:id", UserController.getUser)
  .get("/room/:id", RoomController.getRoom)
  .post("/room", checkToken, RoomController.createRoom)
  .post("/user", UserController.store)
  .post("/user/auth", UserController.auth)
  .get(
    "/protegido",
    passport.authenticate("bearer", { session: false }),
    (req, res) => {
      res.send("qwer");
    }
  );
module.exports = routes;
