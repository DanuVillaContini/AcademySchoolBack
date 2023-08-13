const { Router } = require("express")
const { check, param, body} = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { createAlumno, deleteAlumno, updateByIdAlumno, findByIdAlumno, findAllAlumno } = require("../controllers/alumnos.controllers")

const alumnoRouter = Router()

alumnoRouter.post("/create",
    [
        check('nameAlumno', "Ingrese nombre del alumno").notEmpty(),
        check('lastnameAlumno', "Ingrese apellido del alumno").notEmpty(),
        check('dniAlumno', "Ingrese numero de legajo del alumno").notEmpty(),
        check('anio', "Ingrese año del alumno").notEmpty()
    ],
    expressValidations,
    createAlumno
)
alumnoRouter.get("/find", findAllAlumno)
alumnoRouter.get("/find-by-id/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")
    ],
    expressValidations,
    findByIdAlumno
)
alumnoRouter.put("/update/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un ID válido"),
        body("nameAlumno").isString().optional().withMessage("Debe mandar un nombre"),
        body("lastnameAlumno").isString().optional().withMessage("Debe mandar un apellido"),
        body("dniAlumno").isNumeric().optional().withMessage("Debe mandar un número de legajo válido"),
        body('anio').isNumeric().optional().withMessage("Debe indicar el año correcto de cursado del alumnos")
    ],
    expressValidations,
    updateByIdAlumno
)
alumnoRouter.delete("/delete/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")
    ],
    expressValidations,
    deleteAlumno
)

module.exports = alumnoRouter