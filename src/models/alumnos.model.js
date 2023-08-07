const mongoose = require("mongoose")

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
        legajoAlumno: {
            type: Number,
            required: true,
            unique: false,
            minLenght: 4,
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
        }
    }
)


const Alumno = mongoose.model("Alumno", alumnoSchema)
module.exports = Alumno