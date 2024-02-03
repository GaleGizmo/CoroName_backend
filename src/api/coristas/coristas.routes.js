const coristasRoutes = require("express").Router();

const { getCoristas, postCorista, deleteCorista, editCorista } = require("./coristas.controller");



coristasRoutes.get("/", getCoristas);
coristasRoutes.post("/", postCorista);
coristasRoutes.delete("/", deleteCorista)
coristasRoutes.put("/", editCorista)
module.exports = coristasRoutes;