const express = require("express");

const UserController = require("../controllers/UserController");
const ProductController = require("../controllers/ProductController");
const routes = express.Router();

routes.get("/user", UserController.GetAllUsers);
routes.get(
  "/user/:id",
  UserController.checkToken,
  UserController.GetUserAuthenticated
);
routes.post("/auth/register", UserController.UserRegister);
routes.post("/auth/login", UserController.UserLogin);

routes.get("/products", ProductController.GetAllProducts);
routes.post("/product/register", ProductController.ProductRegister);

module.exports = routes;
