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
    cuotas:{
        type : Boolean,
        required: true,
        default: false
    }
})

const Year = mongoose.model('Year', yearSchema)

module.exports=Year
