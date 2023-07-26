const mongoose = require('mongoose');

const notasSchema = new mongoose.Schema({
    idAlumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'alumnos',
        required: true
    },
    idMateria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'materia',
        required: true
    },
    notaMateria: {
        type: Number,
        required: true,
        minLenght: 1,
        maxLenght: 10
    },
    año: {
        type: Number,
        required: true,
        minLenght: 1,
        maxLenght: 4
    }
});

const Nota = mongoose.model('Nota', notasSchema);

module.exports = Nota;
