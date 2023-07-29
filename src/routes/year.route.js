const { Router } = require("express")
const { check, param, body } = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { updateYear } = require("../controllers/year.controllers")

const yearRouter = Router()

// http://localhost:8000/year/show
// yearRouter.get('/show/:id', [
//     param('idAlumno', 'El Id del alumno debe ser valido').isMongoId(),
//     body("anio", "Debe ingresar un año").notEmpty(),
//     body("anio", "El año debe Ser 1,2,3,4").isNumeric()
// ], expressValidations,
//     showYear)

yearRouter.put("/update-year/:id/:cuota", [check("id").isMongoId().withMessage("El id del año debe ser válido"),
check("cuota").matches(/^(cuotaUno|cuotaDos|cuotaTres|cuotaCuatro|cuotaCinco|cuotaSeis)$/).withMessage("Nombre de cuota no válido")],
expressValidations, updateYear)
module.exports = yearRouter