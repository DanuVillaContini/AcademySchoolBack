const Personal = require("../models/personal.model");
const bcrypt = require('bcryptjs');
const Institucion = require("../models/institucion.model")

const iniciarSuperUsuarioDB = async () => {
    try {
        const collection = await Personal.find();
        if (collection.length > 0) return;
        var salt = bcrypt.genSaltSync(5);
        var hashedPassword = bcrypt.hashSync("academy1234", salt);
        const superUsuario = new Personal({
            nameUser: "superuser",
            lastnameUser: "Super",
            telefono: "123456789",
            correo: "superuser@example.com",
            dniUser: "1",
            isAdmin: true,
            pass: hashedPassword
        });
        await superUsuario.save();
    } catch (error) {
        console.error("Error al crear el super usuario:", error);
    }
};

const iniciarInstitutoDB = async () => {
    try{
        const collection = await Institucion.find()
        if (collection.length > 0) return
        const institutoDefecto = new Institucion({
            nombreInstituto: "Instituto",
            telefonoInstituto: "123456789",
            correoInstituto: "instituto@example.com",
            direccionInstituto: "adress instituto 1234",
            datosActualizados: false 
        })
        await institutoDefecto.save()
    }catch (error){
        console.error("Error al crear la Institucion:", error)
    }
}

module.exports = {
    iniciarSuperUsuarioDB, iniciarInstitutoDB
}
