const { Router } = require("express")
const { check, param, body } = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { updateYear, showYear } = require("../controllers/year.controllers")

const yearRouter = Router()

yearRouter.get('/show/:id', [
    check("id").isMongoId().withMessage("El id del año debe ser válido")],
    expressValidations,
    showYear)
yearRouter.put("/update/:id/:cuota", [
    check("id").isMongoId().withMessage("El id del año debe ser válido"),
    check("cuota").matches(/^(cuota1|cuota2|cuota3|cuota4|cuota5|cuota6|cuota7|cuota8|cuota9|cuota10)$/).withMessage("Nombre de cuota no válido")
],
    expressValidations, updateYear)
module.exports = yearRouter