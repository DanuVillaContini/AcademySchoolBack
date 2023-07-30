const { Router } = require("express") 
const { updateInstitucion, showDataInstituto } = require("../controllers/institucion.controllers")
const { expressValidations } = require("../middleware/common.validation")
const { check } = require("express-validator")

const institutoRouter = Router()

// http://localhost:8000/instituto/show
institutoRouter.get("/show", showDataInstituto)

// http://localhost:8000/instituto/update
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
updateInstitucion)

module.exports = institutoRouter