const mongoose = require("mongoose")
const { boolean } = require("webidl-conversions")

const alumnoSchema = mongoose.Schema(
    {
        nameAlumno: {
            type: String,
            required: true,
            trim: true,
            minLenght: 3,
            maxLenght: 15
        },
        lastnameAlumno: {
            type: String,
            required: true,
            trim: true,
            minLenght: 3,
            maxLenght: 30
        },
        dniAlumno: {
            type: Number,
            required: true,
            unique: true,
            minLenght: 8,
        },

        cuotaAlumno: {
            type: Boolean,
            require: true,
            default: false
        },
        idAnio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Year',
            required: true
        },
        anio: {
            type: Number,
            required: true,
            minLenght: 1
        },
        libreta: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Materias',
            required: true
        },
        isActive: {
            type: Boolean,
            required: false,
            default: true
      }
    }
)


const Alumno = mongoose.model("Alumno", alumnoSchema)
module.exports = Alumno