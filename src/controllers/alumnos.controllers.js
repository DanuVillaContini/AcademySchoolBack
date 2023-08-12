const Year = require("../models/year.model");
const Alumno = require("../models/alumnos.model");
const Materias = require("../models/materias.model");



const createAlumno = async (req, res) => {
    try {
        const {
            nameAlumno,
            lastnameAlumno,
            dniAlumno,
            anio
        } = req.body;


        const alumnoCollection = await Alumno.find({ dniAlumno });
        if (alumnoCollection.length) {
            return res.status(400).json({ message: `El alumno con dni ${dniAlumno} ya existe` });
        }

        const year = new Year({
            anio: anio
        });
        await year.save();

        const materias = new Materias()
        await materias.save()

        const alumno = new Alumno({
            nameAlumno,
            lastnameAlumno,
            dniAlumno,
            anio,
            idAnio: year._id,
            libreta: materias._id
        });

        await alumno.save();


        res.status(201);
        res.json({ message: "Alumno registrado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};


const findAllAlumno = async (req, res) => {
    try {
        const nameRegex = new RegExp(req.query.nameAlumno);
        const lastnameRegex = new RegExp(req.query.lastnameAlumno);
        const filters = {
            nameAlumno: {
                $regex: nameRegex,
            },
            lastnameAlumno: {
                $regex: lastnameRegex,
            },
        };
        const alumno = await Alumno.find(filters).populate("idAnio").populate("libreta");

        res.json({ message: "Alumno encontrado", data: alumno });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};


const findByIdAlumno = async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id).populate(idAnio);

        if (alumno === null) {
            res.status(404);
            return res.json({ message: "Alumno not found" });
        }

        res.json({ message: "FIND ALUMNO BY ID: ", data: alumno });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};


const updateByIdAlumno = async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);

        if (alumno === null) {
            res.status(404);
            return res.json({ message: "Alumno not found or already deleted" });
        }

        await Alumno.findByIdAndUpdate(req.params.id, {
            nameAlumno: req.body.nameAlumno,
            lastnameAlumno: req.body.lastnameAlumno,
            anio: req.body.anio,
            dniAlumno: req.body.dniAlumno
        });

        res.json({ message: "Update Alumno" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};


const deleteAlumno = async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);

        if (alumno === null) {
            res.status(404);
            return res.json({ message: "Alumno not found or already deleted" });
        }

        const filters = { _id: req.params.id };

        const deletedDocuments = await Alumno.deleteOne(filters);

        res.json({ message: "Delete Alumno"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};

module.exports = {
    createAlumno,
    findByIdAlumno,
    updateByIdAlumno,
    deleteAlumno,
    findAllAlumno
}