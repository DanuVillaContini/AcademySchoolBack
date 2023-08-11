const mongoose = require("mongoose")

const materiasSchema = new mongoose.Schema(
    {
        Matematica: {
            type: Number,
            default: 1
        },
        Quimica: {
            type: Number,
            default: 1
        },
        Lengua: {
            type: Number,
            default: 1
        },
        Biologia: {
            type: Number,
            default: 1
        },
        Fisica: {
            type: Number,
            default: 1
        },
        Geografia: {
            type: Number,
            default: 1
        },
        Economia: {
            type: Number,
            default: 1
        },
        Historia: {
            type: Number,
            default: 1
        },
        EducacionFisica: {
            type: Number,
            default: 1
        }
    }

)


const Materias = mongoose.model('Materias', materiasSchema);

module.exports = Materias;



