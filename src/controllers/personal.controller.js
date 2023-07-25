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
    res.json({ message: "Personal registrado exitosamente" })
}

const findAllPersonal = async ( req, res) => {
    const nameRegex = new RegExp(req.query.nameUser)
    const lastnameRegex = new RegExp(req.query.lastnameUser)
    const filters = {
        nameUser: {
            $regex: nameRegex,
        },
        lastnameUser: {
            $regex: lastnameRegex,
        }
    }
    const personal = await Personal.find(filters)

    res.json({ message: "Personas encontrado", data: personal })
}


const findByIdPersonal = async ( req, res) => {
    const personal = await Personal.findById(req.params.id)

    if (personal === null) {
        res.status(404)
        return res.json({ message: "Personal admin not found"})
    }

    res.json({ message: "FIND PERSONAL BY ID", data: personal })
}


const updateByIdPersonal = async ( req, res) => {
    
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