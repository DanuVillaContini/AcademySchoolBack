const { Router } = require("express")
const { param, body } = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { createNotaAlumno, showNotaAlumno, updateNotaAlumno } = require("../controllers/notas.controllers")


const notasRouter = Router()

// http://localhost:8000/notas/create
notasRouter.post("/create",
    [
        body("idAlumno").isMongoId().withMessage("El ID del alumno debe ser válido"),
        body("idMateria").isMongoId().withMessage("El ID de la materia debe ser válido"),
        body("notaMateria").isNumeric().withMessage("La nota debe ser un número válido"),
        body("curso").isNumeric().withMessage("El año de cursado debe ser un número entero válido"),
    ],
    expressValidations,
    createNotaAlumno
)

// http://localhost:8000/notas/show-all
notasRouter.get(
    "/show/:idAlumno/:idMateria",
    [
        param("idAlumno").isMongoId().withMessage("El ID del alumno debe ser válido"),
        param("idMateria").isMongoId().withMessage("El ID de la materia debe ser válido"),
    ],
    expressValidations,
    showNotaAlumno
)


// http://localhost:8000/notas/update/:idAlumno/:idMateria
notasRouter.put("/update/:idAlumno/:idMateria",
    [
        param("idAlumno").isMongoId().withMessage("Debe mandar id del alumno valido"),
        param("idMateria").isMongoId().withMessage("Debe mandar id de la materia valido"),
        body("notaMateria").isNumeric().withMessage("La nota debe ser un número válido")
    ],
    expressValidations,
    updateNotaAlumno
)







module.exports = notasRouter