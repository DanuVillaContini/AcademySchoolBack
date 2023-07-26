const Materia = require("../models/materias.model")

const createMateria = async (req, res) => {
    const materias = [
        "Matemáticas",
        "Lengua y Literatura",
        "Biología",
        "Física",
        "Química",
        "Economía",
        "Geografía",
        "Historia",
        "Educación Física",
    ];

    try {
        for (const materia of materias) {
            const existingMateria = await Materia.findOne({ nombreMateria: materia });

            if (!existingMateria) {
                const newMateria = new Materia({ nombreMateria: materia });
                await newMateria.save();
            }
        }
        console.log("Materias creadas exitosamente.");
    } catch (error) {
        console.error("Error al crear las materias:", error);
    }
}


const showMaterias = async (req, res) => {
    try {
        // Obtener todas las materias de la base de datos
        const materias = await Materia.find();

        // Comprobar si hay materias
        if (materias.length === 0) {
            return res.status(404).json({ message: "No se encontraron materias." });
        }

        // Enviar la lista de materias como respuesta
        res.json(materias);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las materias." });
    }
}




module.exports = {
    createMateria,
    showMaterias
}
