const mongoose = require('mongoose');

const notasSchema = new mongoose.Schema({
    idAlumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true
    },
    idMateria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Materia',
        required: true
    },
    notaMateria: {
        type: Number,
        required: true,
        maxLenght: 2
    },
    curso: {
        type: Number,
        required: true,
        maxLenght: 1
    }
});

const Nota = mongoose.model('Nota', notasSchema);

module.exports = Nota;
