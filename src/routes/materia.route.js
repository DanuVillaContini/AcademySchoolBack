const { Router } = require("express")
const { check, param, body } = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { createMateria } = require("../controllers/materia.controllers")


const materiaRouter = Router()

// http://localhost:8000/materia/create
materiaRouter.post("/create",
    [
        check('nombreMateria', "Ingrese nombre de la materia a crear").notEmpty()
    ],
    expressValidations,
    createMateria
)





module.exports = materiaRouter