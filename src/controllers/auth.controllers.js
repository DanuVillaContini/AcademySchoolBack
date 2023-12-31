const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../common/constante")
const Personal = require("../models/personal.model")
const Institucion = require("../models/institucion.model")
const { validationResult } = require('express-validator');

const updateRol = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { pass } = req.body;

  try {
    let personal = await Personal.findById(id);
    if (!personal) {
      return res.status(404).json({ msg: 'Personal no encontrado' });
    }

    if (personal.correo === "superuser@example.com") {
      return res.status(403).json({ msg: 'No se permite cambiar el rol y contraseña del superusuario' });
    }

    personal.isAdmin = true;
    const salt = await bcrypt.genSalt(10);
    personal.pass = await bcrypt.hash(pass, salt);
    await personal.save();
    return res.status(200).json({ msg: 'Rol actualizado y contraseña creada exitosamente' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
};
const revokeAdminRole = async (req, res) => {
  const { id } = req.params;

  try {
    let personal = await Personal.findById(id);
    if (!personal) {
      return res.status(404).json({ msg: 'Personal no encontrado' });
    }

    if (personal.correo === "superuser@example.com") {
      return res.status(403).json({ msg: 'No se permite cambiar el rol del superusuario' });
    }

    personal.isAdmin = false;
    personal.pass = "";
    await personal.save();

    return res.status(200).json({ msg: 'Rol de administrador revocado exitosamente' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
};




const loginUser = async (req, res) => {
  try {
    const { correo, pass } = req.body;
    const personal = await Personal.findOne({ correo });
    if (personal === null) {
      res.status(404);
      return res.json({ message: "Usuario Inexistente" });
    }
    const isMatch = bcrypt.compareSync(pass, personal.pass);
    if (!isMatch) {
      res.status(401);
      return res.json({ message: "Sin autorización" });
    }
    const instituciones = await Institucion.find()
    const institucion = instituciones[0]
    const token = jwt.sign(
      {
        id: personal._id,
        correo: personal.correo,
        isAdmin: personal.isAdmin,
        datosActualizados: institucion.datosActualizados
      },
      JWT_SECRET
    );
    res.status(200);
    res.json({ access_token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
  }
};

const changePassword = async (req, res) => {
  const { id } = req.params;
  const { correo, nuevaPass } = req.body;

  try {
    let personal = await Personal.findById(id);
    if (!personal) {
      return res.status(404).json({ msg: 'Personal no encontrado' });
    }

    if (personal.correo === "superuser@example.com") {
      return res.status(403).json({ msg: 'No se permite cambiar la contraseña del superusuario' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nuevaPass, salt);

    personal.pass = hashedPassword;
    await personal.save();

    return res.status(200).json({ msg: 'Contraseña cambiada exitosamente' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
};

module.exports = {
  updateRol,
  loginUser,
  revokeAdminRole,
  changePassword
};


module.exports = { updateRol, loginUser, revokeAdminRole, changePassword }