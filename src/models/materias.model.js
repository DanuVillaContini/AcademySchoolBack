const mongoose = require("mongoose")

const materiaSchema = new mongoose.Schema(
    {
        nombreMateria: {
            type: String,
            required: true,
            unique: true
        }
    }

)


const Materia = mongoose.model('Materia', materiaSchema);

module.exports = Materia;



