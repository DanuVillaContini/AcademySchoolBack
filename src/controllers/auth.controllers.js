const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../common/constante")
const Personal = require("../models/personal.model")
const { validationResult } = require('express-validator');

const updateRol = async (req, res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { pass } = req.body;

  try {
    // Busca al personal por el ID proporcionado
    let personal = await Personal.findById(id);

    // Verifica si el personal existe
    if (!personal) {
      return res.status(404).json({ msg: 'Personal no encontrado' });
    }

    // Actualiza el estado isAdmin a true
    personal.isAdmin = true;

    // Genera el hash de la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    personal.pass = await bcrypt.hash(pass, salt);

    // Guarda los cambios en la base de datos
    await personal.save();

    return res.status(200).json({ msg: 'Rol actualizado y contraseña creada exitosamente' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
}



const loginUser = async (req, res) => {
  const {
      correo,
      pass
  } = req.body

  //Preguntamos si existe el user
  const personal = await Personal.findOne({ correo })

  if (personal === null) {
      //codigo no existe
      res.status(404)
      return res.json({ message: "Usuario Inexistente" })
  }

  // Verifica si la contraseña es igual a la que se creo al principio en el registro
  const isMatch = bcrypt.compareSync(pass, personal.pass)

  // Error 401 sin autorizacion
  if (!isMatch) {
      res.status(401)
      return res.json({ message: "Sin autorizacion" })
  }

  //Funcion que Firma JWT
  const token = jwt.sign(
      {
          id: personal._id,
          correo: personal.correo,
          isEmployee: personal.isEmployee
      }, JWT_SECRET)

  res.status(200)
  res.json({ access_token: token })

}




module.exports = {updateRol, loginUser}