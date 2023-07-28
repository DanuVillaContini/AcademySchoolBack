const Personal = require("../models/personal.model");
const bcrypt = require('bcryptjs');

const iniciarSuperUsuarioDB = async () => {
    try {
        console.log("Iniciando SP");

        const collection = await Personal.find();

        if (collection.length > 0) return;

        //[----logica de Encriptacion de pass----]:
        var salt = bcrypt.genSaltSync(5);
        var hashedPassword = bcrypt.hashSync("academy1234", salt);

        const superUsuario = new Personal({
            nameUser: "superuser",
            lastnameUser: "Super",
            dateAdmission: new Date(),
            telefono: "123456789",
            correo: "superuser@example.com",
            legajoUser: "1",
            isAdmin: true,
            pass: hashedPassword
        });

        await superUsuario.save();
        console.log("Super usuario creado exitosamente");
    } catch (error) {
        console.error("Error al crear el super usuario:", error);
    }
};

module.exports = { iniciarSuperUsuarioDB };
