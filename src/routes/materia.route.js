const { Router } = require("express")
const { showMaterias, updateMaterias } = require("../controllers/materia.controllers")
const { expressValidations } = require("../middleware/common.validation")
const { body, check } = require("express-validator")

const materiaRouter = Router()

// http://localhost:8000/materias/show/:id
materiaRouter.get("/show/:id",
    [
        check("id").isMongoId().withMessage("El id del año debe ser válido")
    ]
    ,
    expressValidations,
    showMaterias)

// http://localhost:8000/materias/update/:id/:materia
materiaRouter.put("/update/:id/:materia/",
    [
        check("id").isMongoId().withMessage("El id del año debe ser válido"),
        check("materia").matches(/^(Matematica|Quimica|Lengua|Biologia|Fisica|Geografia|Economia|Historia|EducacionFisica)$/).withMessage("Nombre de materia no válido"),
        body("nota").isInt({ min: 1, max: 10 }).withMessage("La nota debe estar entre 1 y 10.")
        
    ]
    , expressValidations,
    updateMaterias
)


module.exports = materiaRouter