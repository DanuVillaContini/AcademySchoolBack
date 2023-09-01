const { Router } = require("express") 
const { updateInstitucion, showDataInstituto } = require("../controllers/institucion.controllers")
const { expressValidations } = require("../middleware/common.validation")
const { check } = require("express-validator")
const { verifyJWT } = require("../middleware/auth.validations")

const institutoRouter = Router()

institutoRouter.get("/show", showDataInstituto)

institutoRouter.put("/update",
[
    check("nombreInstituto","Ingrese nombre del Instituto").notEmpty(),
    check("telefonoInstituto","Ingrese telefono del Instituto").notEmpty(),
    check("telefonoInstituto","El telefono deben ser numeros").isNumeric(),
    check("correoInstituto","Ingrese correo del Instituto").notEmpty(),
    check("correoInstituto","Ingrese correo del Instituto").isEmail().optional(),
    check("direccionInstituto","Ingrese direccion del Instituto").notEmpty(),
],
expressValidations,
verifyJWT,
updateInstitucion)

module.exports = institutoRouter