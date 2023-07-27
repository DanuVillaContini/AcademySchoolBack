const { Router } = require("express")
const { check, param, body} = require("express-validator")
const { expressValidations } = require("../middleware/common.validation")
const { createPersonal, deletePersonal, updateByIdPersonal, findByIdPersonal, findAllPersonal } = require("../controllers/personal.controller")



const personalRouter = Router()


// http://localhost:8000/personal/create
personalRouter.post("/create",
    [
        check('nameUser', "Ingrese nombre del empleado").notEmpty(),
        check('lastnameUser', "Ingrese apellido del empleador").notEmpty(),
        check('dateAdmission', "Indique fecha de ingreso").notEmpty(),

        check('correo', 'Ingrese el correo del personal').notEmpty(),
        check('correo', 'El Correo debe ser una dirección de correo electrónico válida').isEmail(),

        check('legajoUser', "Ingrese el n° de legajo").notEmpty()
    ],
    expressValidations,
    createPersonal

)


// http://localhost:8000/personal/find
personalRouter.get("/find", findAllPersonal)


// http://localhost:8000/personal/find-by-id/
personalRouter.get("/find-by-id/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")
    ],
    expressValidations,
    findByIdPersonal

)

// http://localhost:8000/personal/update
personalRouter.put("/update/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un ID válido"),
        body("nameUser").isString().optional().withMessage("Debe mandar un nombre"),
        body("lastnameUser").isString().optional().withMessage("Debe mandar un apellido"),
        body("dateAdmission").toDate().optional().isDate().withMessage("Debe mandar una fecha de admisión válida"),
        body("telefono").isString().optional().withMessage("Debe mandar un telefono"),
        body("correo").isString().optional().withMessage("Debe mandar un contacto personal"),
        body("legajoUser").isNumeric().optional().withMessage("Debe mandar un número de legajo válido")

    ],
    expressValidations,
    updateByIdPersonal
)
// http://localhost:8000/personal/delete
personalRouter.delete("/delete/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")
    ],
    expressValidations,
    deletePersonal

)


// http://localhost:8000/personal/login
// personalRouter.post("/login",
//     [

//     ],
//     expressValidations

// )



module.exports = personalRouter
