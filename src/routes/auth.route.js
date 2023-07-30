const { Router } = require("express");
const { check, param } = require("express-validator");
const { expressValidations } = require("../middleware/common.validation");
const updateRol = require("../controllers/auth.controllers");

// http://localhost:8000/auth
const authRouter = Router();

//  authRouter.post(
//    "/login",
//    [
//      check("correo", "Debe ingresar un Correo").notEmpty(),
//      check("correo", "El formato debe ser example@example.com").isEmail(),
//      check("pass", "Debe el pass de usuario").notEmpty(),
//      check("pass", "Debe ser alphanumerico el pass").isAlphanumeric(),
//    ],
//    expressValidations,
//    loginUser
//  );

authRouter.put(
  "/update-rol/:id",
  [
    param("id").isMongoId().withMessage("Debe mandar un ID válido"),
    check("isAdmin", "Debe mandar un booleano como isAdmin").isBoolean(),
    check("pass", "Debe el pass de usuario").notEmpty(),
    check("pass", "Debe ser alphanumerico el pass").isAlphanumeric(),
  ],
  expressValidations,
  updateRol
);

module.exports = authRouter;
