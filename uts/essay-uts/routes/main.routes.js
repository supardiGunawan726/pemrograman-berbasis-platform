const {
  index,
  about,
  unknownMethod,
} = require("../controllers/main.controller");

const mainRoutes = require("express").Router();

mainRoutes.get("/", index);
mainRoutes.use(unknownMethod("/"));
mainRoutes.get("/about", about);
mainRoutes.use(unknownMethod("/about"));

module.exports = mainRoutes;
