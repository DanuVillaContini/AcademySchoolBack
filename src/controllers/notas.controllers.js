const Nota = require("../models/alumnos.model")
const Alumno = require("../models/alumnos.model")
const Materia = require("../models/materias.model")


const createNotaAlumno = async (req, res) => {
    const {
        idAlumno,
        idMateria,
        notaMateria,
        año
    } = req.body

    try {
        // Logica para check si existe (alumno) en base a idAlumno
        const alumnoExistente = await Alumno.findById(idAlumno);
        if (!alumnoExistente) {
            return res.status(404).json({ message: "El ID del alumno no existe." });
        }
        // Logica para check si existe (materia) en base a idMateria
        const materiaExistente = await Materia.findById(idMateria);
        if (!materiaExistente) {
            return res.status(404).json({ message: "El ID de la materia no existe." });
        }

        // Crear la nueva nota
        const nuevaNota = new Nota({
            idAlumno,
            idMateria,
            notaMateria,
            año
        })

        await nuevaNota.save();

        res.status(201).json({ message: "Nota cargada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la nota" });
    }
}


module.exports = {
    createNotaAlumno
}