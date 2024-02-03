const nombresRoutes = require("express").Router();

const { postNombre, getNombres, deleteNombre, editNombre } = require("./nombres.controller");

nombresRoutes.post("/", postNombre);
nombresRoutes.delete("/:idNombre", deleteNombre)
nombresRoutes.get("/", getNombres);
nombresRoutes.put("/:idNombre", editNombre)
module.exports = nombresRoutes;
