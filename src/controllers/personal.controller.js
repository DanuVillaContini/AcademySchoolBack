const Personal = require("../models/personal.model")


const createPersonal = async ( req, res) => {
    const{
        nameUser,
        lastnameUser,
        dateAdmission,
        personalContacto,
        legajoUser

    } = req.body

    
    const personal = new Personal({
        nameUser,
        lastnameUser,
        dateAdmission,
        personalContacto: {
            telefono: personalContacto.telefono,
            correo: personalContacto.correo,
        },
        legajoUser
    })

    await personal.save()
    res.status(201)
    res.json({ message: "Personal registrado exitosamente", data })
}


const updateByIdPersonal = async ( req, res) => {

}
const findAllPersonal = async ( req, res) => {

}
const findByIdPersonal = async ( req, res) => {

}
const deletePersonal = async ( req, res) => {

}

module.exports = {
    createPersonal,
    findByIdPersonal,
    updateByIdPersonal,
    deletePersonal,
    findAllPersonal
}