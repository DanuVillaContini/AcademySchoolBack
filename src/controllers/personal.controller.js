const Personal = require("../models/personal.model")


const createPersonal = async ( req, res) => {
    const{
        nameUser,
        lastnameUser,
        dateAdmission,
        telefono,
        correo,
        legajoUser

    } = req.body

    
    const personal = new Personal({
        nameUser,
        lastnameUser,
        dateAdmission,
        telefono,
        correo,
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
    const personal = await Personal.findById(req.params.id)

    if (personal === null) {
        res.status(404)
        return res.json({ message: "Personal admin not found or already delete"})
    }

    await Personal.findByIdAndUpdate(req.params.id, {
        nameUser: req.body.nameUser,
        lastnameUser: req.body.lastnameUser,
        dateAdmission: req.body.dateAdmission,
        personalContacto: {
            telefono: req.body.personalContacto.telefono,
            correo: req.body.personalContacto.correo,
        },
        legajoUser: req.body.legajoUser
    })

    res.json({ message: "Update Personal" })
}


const deletePersonal = async ( req, res) => {
    const personal = await Personal.findById(req.params.id)

    if (personal === null) {
        res.status(404)
        return res.json({ message: "Personal admin not found or already delete"})
    }

    const filters = { _id: req.params.id}

    const deletedDocuments = await Personal.deleteOne(filters)

    res.json({ message: "Delete Personal: " + personal.nameUser })
}



module.exports = {
    createPersonal,
    findByIdPersonal,
    updateByIdPersonal,
    deletePersonal,
    findAllPersonal
}