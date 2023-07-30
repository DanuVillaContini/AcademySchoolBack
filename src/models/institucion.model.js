const mongoose = require("mongoose")

const institucionSchema = new mongoose.Schema(
    {
        nombreInstituto:{
            type: String,
            required: true,
            unique: true
        },
        telefonoInstituto:{
            type: String,
            required: true,
            minLenght: 10,
            maxLenght: 15
        },
        correoInstituto:{
            type: String,
            required: true,
            trim: true,
            unique: true,
            minLenght: 10,
            maxLenght: 64
        },
        direccionInstituto:{
            type: String,
            required: true,
            trim: true,
            minLenght: 5,
            maxLenght: 64
        },
        datosActualizados:{
            type: Boolean,
            required: false,
            default: false
        }
    }
)

const Institucion = mongoose.model('institucion', institucionSchema)
module.exports = Institucion

