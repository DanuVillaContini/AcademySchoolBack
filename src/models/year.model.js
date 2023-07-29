const mongoose = require('mongoose')

const yearSchema= new mongoose.Schema({
    idAlumno:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true

    },
    anio:{
        type : Number,
        minLenght: 1,
        required :true
    },
    cuotaUno: {
        type:Boolean,
        default: false
    },
    cuotaDos: {
        type:Boolean,
        default: false
    },
    cuotaTres: {
        type:Boolean,
        default: false
    },
    cuotaCuatro: {
        type:Boolean,
        default: false
    },
    cuotaCinco: {
        type:Boolean,
        default: false
    },
    cuotaSeis: {
        type:Boolean,
        default: false
    },
    cuotaSiete: {
        type:Boolean,
        default: false
    },
    cuotaOcho: {
        type:Boolean,
        default: false
    },
    cuotaNueve: {
        type:Boolean,
        default: false
    },
    cuotaDiez: {
        type:Boolean,
        default: false
    }
})

const Year = mongoose.model('Year', yearSchema)

module.exports=Year
