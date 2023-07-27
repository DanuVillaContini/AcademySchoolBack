const { Router } = require("express")
const {  showMaterias } = require("../controllers/materia.controllers")

const materiaRouter = Router()

// http://localhost:8000/materias/show
materiaRouter.get("/show", showMaterias)

module.exports = materiaRouter