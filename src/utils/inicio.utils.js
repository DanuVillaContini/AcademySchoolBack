const Materia = require("../models/materias.model");
const Personal = require("../models/personal.model");
const bcrypt = require('bcryptjs');

const iniciarMateriasDB = async () => {
    console.log("PrepararDB")
    const materias = [
        "Matemáticas",
        "Lengua y Literatura",
        "Biología",
        "Física",
        "Química",
        "Economía",
        "Geografía",
        "Historia",
        "Educación Física",
    ];
    const collection = await Materia.find();

    // Si encontro algo en la coleccion no crea nada
    if (collection.length > 0) return undefined

    try {
        for (const nombre of materias) {
            const materia = new Materia({
                nombreMateria: nombre
            })
            await materia.save()
        }
    } catch (error) {
        console.error("Error al crear las materias:", error);
    }
}
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

module.exports = {
    iniciarMateriasDB,
    iniciarSuperUsuarioDB
}