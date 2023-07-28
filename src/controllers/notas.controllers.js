const Nota = require("../models/notas.model")
const Alumno = require("../models/alumnos.model")
const Materia = require("../models/materias.model")


const createNotaAlumno = async (req, res) => {
    const {
        idAlumno,
        idMateria,
        notaMateria,
        curso
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
            curso
        })

        await nuevaNota.save();

        res.status(201).json({ message: "Nota cargada exitosamente" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al crear la nota" });
    }
}


const showNotaAlumno = async (req, res) => {
    const { idAlumno, idMateria } = req.params;

    try {

        const nota = await Nota.findOne({ idAlumno, idMateria });
        if (!nota) {
            return res.status(404).json({ message: "No se encontró la nota para el alumno y materia especificados." });
        }

        const materia = await Materia.findById(idMateria);
        if (!materia) {
            return res.status(404).json({ message: "La materia asociada a la nota no fue encontrada." });
        }

        const nombreMateria = materia.nombre;

        const alumno = await Alumno.findById(idAlumno);
        const nombreAlumno = alumno ? alumno.nombre : "Nombre del alumno no disponible";

        const notaInfo = {
            nombreAlumno,
            nombreMateria,
            notaMateria: nota.notaMateria,
            curso: nota.curso
        };

        res.status(200).json(notaInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener la nota del alumno." });
    }
}

const updateNotaAlumno = async (req, res) => {
    const { idAlumno, idMateria } = req.params;
    const { notaMateria, curso } = req.body; 

    try {
        const nota = await Nota.findOne({ idAlumno, idMateria });
        if (!nota) {
            return res.status(404).json({ message: "No se encontró la nota para el alumno y materia especificados." });
        }

        nota.notaMateria = notaMateria;
        nota.curso = curso;

        await nota.save();

        res.status(200).json({ message: "Nota actualizada exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar la nota del alumno." });
    }
}

module.exports = {
    createNotaAlumno,
    showNotaAlumno,
    updateNotaAlumno
}