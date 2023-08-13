const Personal = require("../models/personal.model")

const createPersonal = async (req, res) => {
    try {
        const {
            nameUser,
            lastnameUser,
            dateAdmission,
            telefono,
            correo,
            dniUser
        } = req.body;

        const personal = new Personal({
            nameUser,
            lastnameUser,
            dateAdmission,
            telefono,
            correo,
            dniUser
        });
        await personal.save();
        res.status(201);
        res.json({ message: "Personal registrado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};
const findAllPersonal = async (req, res) => {
    try {
        const nameRegex = new RegExp(req.query.nameUser);
        const lastnameRegex = new RegExp(req.query.lastnameUser);
        const filters = {
            nameUser: {
                $regex: nameRegex,
            },
            lastnameUser: {
                $regex: lastnameRegex,
            }
        };
        const personal = await Personal.find(filters);
        res.json({ message: "Personas encontrado", data: personal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};
const findByIdPersonal = async (req, res) => {
    try {
        const personal = await Personal.findById(req.params.id);
        if (personal === null) {
            res.status(404);
            return res.json({ message: "Personal not found" });
        }
        res.json({ message: "FIND PERSONAL BY ID", data: personal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};
const updateByIdPersonal = async (req, res) => {
    try {
        const personal = await Personal.findById(req.params.id);
        if (personal === null) {
            res.status(404);
            return res.json({ message: "Personal not found or already deleted" });
        }
        await Personal.findByIdAndUpdate(req.params.id, {
            nameUser: req.body.nameUser,
            lastnameUser: req.body.lastnameUser,
            telefono: req.body.telefono,
            correo: req.body.correo,
            dniUser: req.body.dniUser
        });
        res.json({ message: "Update Personal" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};
const deletePersonal = async (req, res) => {
    try {
        const personal = await Personal.findById(req.params.id);
        if (personal === null) {
            res.status(404);
            return res.json({ message: "Personal not found or already deleted" });
        }
        const filters = { _id: req.params.id };
        const deletedDocuments = await Personal.deleteOne(filters);
        res.json({ message: "Delete Personal: " + personal.nameUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};

module.exports = {
    createPersonal,
    findByIdPersonal,
    updateByIdPersonal,
    deletePersonal,
    findAllPersonal
}