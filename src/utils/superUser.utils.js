const Personal = require("../models/personal.model")

const iniciarSuperUsuarioDB = async () => {

    // try {
    //     const nameUser = "superuser";
    //     const lastnameUser = "Super";
    //     const dateAdmission = new Date();
    //     const telefono = "123456789";
    //     const correo = "superuser@example.com";
    //     const legajoUser = "1";
    
    //     const collection = await Personal.find();
        
    //     if (collection.length > 0) return undefined

    //     const superUsuario = new Personal({
    //         nameUser,
    //         lastnameUser,
    //         dateAdmission,
    //         telefono,
    //         correo,
    //         legajoUser
    //     })

    //     await superUsuario.save()
    //     res.status(201).json({ message: "Super usuario creado exitosamente" });
    // } catch (error) {
    //     console.error("Error al crear el super usuario:", error);
    //     res.status(500).json({ message: "Error al crear el super usuario" })
    // }
}


module.exports = { iniciarSuperUsuarioDB }