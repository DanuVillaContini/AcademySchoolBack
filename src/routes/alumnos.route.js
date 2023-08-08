const { Router } = require("express")
const { check, param, body} = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { createAlumno, deleteAlumno, updateByIdAlumno, findByIdAlumno, findAllAlumno } = require("../controllers/alumnos.controllers")

const alumnoRouter = Router()


// http://localhost:8000/alumno/create
alumnoRouter.post("/create",
    [
        check('nameAlumno', "Ingrese nombre del alumno").notEmpty(),
        check('lastnameAlumno', "Ingrese apellido del alumno").notEmpty(),
        check('legajoAlumno', "Ingrese numero de legajo del alumno").notEmpty(),
        check('anio', "Ingrese año del alumno").notEmpty()


    ],
    expressValidations,
    createAlumno
)


// http://localhost:8000/alumno/find
alumnoRouter.get("/find", findAllAlumno)


// http://localhost:8000/alumno/find-by-id/
alumnoRouter.get("/find-by-id/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")
    ],
    expressValidations,
    findByIdAlumno
)

// http://localhost:8000/alumno/update/
alumnoRouter.put("/update/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un ID válido"),
        body("nameAlumno").isString().optional().withMessage("Debe mandar un nombre"),
        body("lastnameAlumno").isString().optional().withMessage("Debe mandar un apellido"),
        body("legajoAlumno").isNumeric().optional().withMessage("Debe mandar un número de legajo válido"),
        body('anio').isNumeric().optional().withMessage("Debe indicar el año correcto de cursado del alumnos")

    ],
    expressValidations,
    updateByIdAlumno
)
// http://localhost:8000/alumno/delete/
alumnoRouter.delete("/delete/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")
    ],
    expressValidations,
    deleteAlumno
)

module.exports = alumnoRouter