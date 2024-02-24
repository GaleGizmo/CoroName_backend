const coristasRoutes = require ("express").Router();

const { getCoristas, postCorista, deleteCorista, editCorista } = require("./coristas.controller");



coristasRoutes.get("/", getCoristas);
coristasRoutes.post("/", postCorista);
coristasRoutes.delete("/:idCorista", deleteCorista)
coristasRoutes.put("/editCorista/:idCorista", editCorista)
module.exports = coristasRoutes;