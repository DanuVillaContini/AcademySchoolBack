const mongoose = require('mongoose')

const yearSchema= new mongoose.Schema({

    anio:{
        type : Number,
        minLenght: 1,
        required :true
    },
    cuota1: {
        type:Boolean,
        default: false
    },
    cuota2: {
        type:Boolean,
        default: false
    },
    cuota3: {
        type:Boolean,
        default: false
    },
    cuota4: {
        type:Boolean,
        default: false
    },
    cuota5: {
        type:Boolean,
        default: false
    },
    cuota6: {
        type:Boolean,
        default: false
    },
    cuota7: {
        type:Boolean,
        default: false
    },
    cuota8: {
        type:Boolean,
        default: false
    },
    cuota9: {
        type:Boolean,
        default: false
    },
    cuota10: {
        type:Boolean,
        default: false
    }
})

const Year = mongoose.model('Year', yearSchema)

module.exports=Year
