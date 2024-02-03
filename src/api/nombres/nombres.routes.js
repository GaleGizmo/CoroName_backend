const nombresRoutes = require("express").Router();

const { postNombre, getNombres, deleteNombre, editNombre } = require("./nombres.controller");

nombresRoutes.post("/", postNombre);
nombresRoutes.delete("/", deleteNombre)
nombresRoutes.get("/", getNombres);
nombresRoutes.put("/", editNombre)
module.exports = nombresRoutes;
