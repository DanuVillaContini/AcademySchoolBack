const Materia = require("../models/materias.model")

const createMateria = async(req, res) => {
    const{
        nombreMateria
    } = req.body

    const materia = new Materia({
        nombreMateria
    })

    await materia.save()
    res.status(201)
    res.json({ message: "Materia Creada"})
}


module.exports = {
    createMateria
}