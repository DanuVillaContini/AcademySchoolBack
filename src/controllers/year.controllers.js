const Year = require ("../models/year.model")

const showYear = async (req, res) => {

    const dato = { idAlumno, anio, cuotas }
    const year = await Year.find(dato)
    res.json({ message: 'Pagos Alumno: ', data: year })


} 

module.exports = {showYear}