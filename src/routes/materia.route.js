const { Router } = require("express")
const { check, param, body } = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { createMateria, showMaterias } = require("../controllers/materia.controllers")


const materiaRouter = Router()


// http://localhost:8000/materias/show
materiaRouter.get("/show", showMaterias)





module.exports = materiaRouter