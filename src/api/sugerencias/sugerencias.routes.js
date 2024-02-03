const sugerenciasRoutes = require("express").Router();

const { postSugerencia, getSugerencias, deleteSugerencia, editSugerencia } = require("./sugerencias.controller");

sugerenciasRoutes.post("/", postSugerencia);
sugerenciasRoutes.delete("/:idSugerencia", deleteSugerencia)
sugerenciasRoutes.get("/", getSugerencias);
sugerenciasRoutes.put("/:idSugerencia", editSugerencia)
module.exports = sugerenciasRoutes;
