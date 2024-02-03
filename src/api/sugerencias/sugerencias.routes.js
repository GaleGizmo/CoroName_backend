const sugerenciasRoutes = require("express").Router();

const { postSugerencia, getSugerencias, deleteSugerencia, editSugerencia } = require("./sugerencias.controller");

sugerenciasRoutes.post("/", postSugerencia);
sugerenciasRoutes.delete("/", deleteSugerencia)
sugerenciasRoutes.get("/", getSugerencias);
sugerenciasRoutes.put("/", editSugerencia)
module.exports = sugerenciasRoutes;
