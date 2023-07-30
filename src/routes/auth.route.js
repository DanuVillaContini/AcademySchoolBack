const { Router } = require("express")
const { check} = require('express-validator');
const { expressValidations } = require("../middlewares/common.validations.js");

authRouter.post("/login",
    [
        check('correo', "Debe ingresar un Correo").notEmpty(),
        check('correo', "El formato debe ser example@example.com").isEmail(),
        check('pass', 'Debe el pass de usuario').notEmpty(),
        check('pass', 'Debe ser alphanumerico el pass').isAlphanumeric(),

    ],
    expressValidations,
    loginUser,
)

module.exports = authRouter