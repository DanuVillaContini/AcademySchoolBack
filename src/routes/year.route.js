const { Router } = require("express")
const { check, param, body } = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { updateYear, showYear } = require("../controllers/year.controllers")

const yearRouter = Router()

http://localhost:8000/year/show
yearRouter.get('/show/:id', [
    check("id").isMongoId().withMessage("El id del año debe ser válido")],
    expressValidations,
    showYear)

yearRouter.put("/update-year/:id/:cuota", [check("id").isMongoId().withMessage("El id del año debe ser válido"),
check("cuota").matches(/^(cuotaUno|cuotaDos|cuotaTres|cuotaCuatro|cuotaCinco|cuotaSeis|cuotaSiete|cuotaOcho|cuotaNueve|cuotaDiez)$/).withMessage("Nombre de cuota no válido")],
expressValidations, updateYear)
module.exports = yearRouter