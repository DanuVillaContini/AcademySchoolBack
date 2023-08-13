const Alumno = require("../models/alumnos.model");
const Materias = require("../models/materias.model");
const { validationResult } = require("express-validator");

const showMaterias = async (req, res) => {
    const libreta = req.params.id;
    try {
        const materias = await Materias.findById(libreta);
        if (!materias) {
            return res.status(404).json({ message: "No se encontraron materias." });
        }
        res.json(materias);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las materias." });
    }
}
const updateMaterias = async (req, res) => {
    const libreta = req.params.id;
    const materiaNombre = req.params.materia;
    const nuevaNota = req.body.nota;
    const validMaterias = ["Matematica", "Quimica", "Lengua", "Biologia", "Fisica", "Geografia", "Economia", "Historia", "EducacionFisica"];
    if (!validMaterias.includes(materiaNombre)) {
        return res.status(400).json({ message: "Nombre de materia no válido" });
    }
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const updatedMaterias = await Materias.findByIdAndUpdate(libreta, { [materiaNombre]: nuevaNota }, { new: true });
        if (!updatedMaterias) {
            return res.status(404).json({ message: "No se encontraron materias para actualizar." });
        }
        res.json(updatedMaterias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar las materias." });
    }
}
module.exports = {
    showMaterias,
    updateMaterias
}
