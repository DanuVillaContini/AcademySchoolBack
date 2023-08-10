const mongoose = require("mongoose")

// Nombre
// Apellido
// FechaIngreso
// Contacto
//     Telefono
//     Correo
// legajo

const personalSchema = mongoose.Schema(
    {
        nameUser: {
            type: String,
            required: true,
            trim: true,
            minLenght: 3,
            maxLenght: 15
        },
        lastnameUser: {
            type: String,
            required: true,
            trim: true,
            minLenght: 3,
            maxLenght: 30
        },
        telefono: {
            type: String,
            required: true,
            minLenght: 10,
            maxLenght: 15
        },
        correo: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minLenght: 10,
            maxLenght: 64
        },
        legajoUser: {
            type: Number,
            required: true,
            unique: true,
            minLenght: 5
        },
        isAdmin: {
            type: Boolean,
            required: false,
            default: false
        },
        pass:{
            type:String,
            required: false,
            maxLenght: 200
        }
    }
)


const Personal = mongoose.model("Personal", personalSchema)
module.exports = Personal