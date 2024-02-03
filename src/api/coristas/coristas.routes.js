const coristasRoutes = require("express").Router();

const { getCoristas } = require("./coristas.controller");



coristasRoutes.get("/", getCoristas);

module.exports = coristasRoutes;