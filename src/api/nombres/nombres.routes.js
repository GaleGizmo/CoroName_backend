const nombresRoutes = require("express").Router();

const { postNombre, getNombres } = require("./nombres.controller");

nombresRoutes.post("/", postNombre);

nombresRoutes.get("/", getNombres);

module.exports = nombresRoutes;
