const sugerenciasRoutes = require("express").Router();

const { postSugerencia, getSugerencias } = require("./sugerencias.controller");

sugerenciasRoutes.post("/", postSugerencia);

sugerenciasRoutes.get("/", getSugerencias);

module.exports = sugerenciasRoutes;
