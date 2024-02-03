const sugerenciasRoutes = require("express").Router();

const { postSugerencia, getSugerencias, deleteSugerencia, editSugerencia } = require("./sugerencias.controller");

sugerenciasRoutes.post("/:idSugerencia", postSugerencia);
sugerenciasRoutes.delete("/:idSugerencia", deleteSugerencia)
sugerenciasRoutes.get("/", getSugerencias);
sugerenciasRoutes.put("/", editSugerencia)
module.exports = sugerenciasRoutes;
