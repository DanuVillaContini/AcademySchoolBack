const { Router } = require("express")
const { check, param, body} = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { createPersonal, deletePersonal, updateByIdPersonal, findByIdPersonal, findAllPersonal } = require("../controllers/personal.controller")
const { verifyJWT } = require("../middleware/auth.validations")

const personalRouter = Router()

personalRouter.post("/create",
    [
        check('nameUser', "Ingrese nombre del empleado").notEmpty(),
        check('lastnameUser', "Ingrese apellido del empleador").notEmpty(),
        check('correo', 'Ingrese el correo del personal').notEmpty(),
        check('correo', 'El Correo debe ser una dirección de correo electrónico válida').isEmail(),
        check('dniUser', "Ingrese el n° de legajo").notEmpty()
    ],
    expressValidations,
    verifyJWT,
    createPersonal
)

personalRouter.get("/find",verifyJWT, findAllPersonal)

personalRouter.get("/find-by-id/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")
    ],
    expressValidations,
    verifyJWT,
    findByIdPersonal
)

personalRouter.put("/update/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un ID válido"),
        body("nameUser").isString().optional().withMessage("Debe mandar un nombre"),
        body("lastnameUser").isString().optional().withMessage("Debe mandar un apellido"),
        body("telefono").isString().optional().withMessage("Debe mandar un telefono"),
        body("correo").isString().optional().withMessage("Debe mandar un contacto personal"),
        body("dniUser").isNumeric().optional().withMessage("Debe mandar un número de legajo válido")

    ],
    expressValidations,
    verifyJWT,
    updateByIdPersonal
)
personalRouter.delete("/delete/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")
    ],
    expressValidations,
    verifyJWT,
    deletePersonal

)

module.exports = personalRouter
