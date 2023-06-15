const express = require("express");

const UserController = require("../controllers/UserController");
const routes = express.Router();

routes.get("/user", UserController.GetAllUsers);
routes.get(
  "/user/:id",
  UserController.checkToken,
  UserController.GetUserAuthenticated
);
routes.post("/auth/register", UserController.UserRegister);
routes.post("/auth/login", UserController.UserLogin);

module.exports = routes;
