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

    //Logica para verificar si existe y Comparar idAlumno con id del alumno del modelo alumnos
    const alumnoExistente = await Alumno.findById(idAlumno);
    if (!alumnoExistente) {
        return res.status(404).json({ message: "El ID del alumno no existe." });
    }

    //Logica para verificar si existe y Comparar idMateria con id de la materia del modelo Materia
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

    await nuevaNota.save()

    res.state(201)
    res.json({ message: "Nota cargada exitosamente" })
}


module.exports = {
    createNotaAlumno
}