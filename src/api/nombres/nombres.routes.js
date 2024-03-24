const nombresRoutes = require("express").Router();

const { postNombre, getNombres, deleteNombre, editNombre, addVoto, noMoreVotes } = require("./nombres.controller");

nombresRoutes.post("/", postNombre);
nombresRoutes.delete("/:idNombre", deleteNombre)
nombresRoutes.get("/", getNombres);

nombresRoutes.put("/:idNombre", editNombre)
nombresRoutes.post("/addVoto/:idCorista", noMoreVotes)
module.exports = nombresRoutes;
