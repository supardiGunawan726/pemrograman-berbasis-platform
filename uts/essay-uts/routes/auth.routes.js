const {
  displayAllUsers,
  displayUser,
  login,
  register,
  unknownMethod,
} = require("../controllers/auth.controller");

const authRoutes = require("express").Router();

authRoutes.get("/users", displayAllUsers);
authRoutes.use(unknownMethod("/users"));
authRoutes.post("/users/login", login);
authRoutes.use(unknownMethod("/users/login"));
authRoutes.post("/users/register", register);
authRoutes.use(unknownMethod("/users/register"));
authRoutes.get("/users/:id", displayUser);

module.exports = authRoutes;
