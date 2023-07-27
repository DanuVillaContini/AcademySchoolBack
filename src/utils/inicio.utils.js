const Materia = require("../models/materias.model");
const iniciarMateriasDB = async () => {
    console.log("PrepararDB")
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
    const collection = await Materia.find();

    // Si encontro algo en la coleccion no crea nada
    if (collection.length > 0) return undefined

    try {
        for (const nombre of materias) {
            const materia = new Materia({
                nombreMateria: nombre
            })
            await materia.save()
        }
    } catch (error) {
        console.error("Error al crear las materias:", error);
    }
}

module.exports = {
    iniciarMateriasDB
}