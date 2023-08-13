const { Router } = require("express");
const { check, param } = require("express-validator");
const { expressValidations } = require("../middleware/common.validation");
const {updateRol, loginUser} = require("../controllers/auth.controllers");

const authRouter = Router();

authRouter.post(
  "/login",
  [
    check("correo", "Debe ingresar un Correo").notEmpty(),
    check("correo", "Formato del correo debe ser example@example.com").isEmail(),
    check("pass", "Debe el pass de usuario").notEmpty(),
    check("pass", "Debe ser alphanumerico el pass").isAlphanumeric(),
  ],
  expressValidations,
  loginUser
);
authRouter.put(
  "/update-rol/:id",
  [
    param("id").isMongoId().withMessage("Debe mandar un ID válido"),
    check("pass", "Debe el pass de usuario").notEmpty(),
    check("pass", "Debe ser alphanumerico el pass").isAlphanumeric(),
  ],
  expressValidations,
  updateRol
);

module.exports = authRouter;
