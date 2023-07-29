
const express = require('express')
const mongoose = require("mongoose");
const alumnoRouter = require('./src/routes/alumnos.route');
const personalRouter = require('./src/routes/personal.route');
const notasRouter = require('./src/routes/notas.route');
const materiaRouter = require('./src/routes/materia.route');
const { iniciarMateriasDB, iniciarSuperUsuarioDB } = require("./src/utils/inicio.utils");
const yearRouter = require('./src/routes/year.route');



require("dotenv").config()

const app = express()
const port = process.env.PORT

//Indico a la app que recibira jsons del user
app.use(express.json({ limit: "50mb" }))

//
app.use("/alumno", alumnoRouter)
app.use("/personal", personalRouter)
app.use("/notas", notasRouter)
app.use("/materias", materiaRouter)
app.use("/year",yearRouter)



mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB: 'pruebaFinalProject' CONECTADA")
        iniciarMateriasDB()
        iniciarSuperUsuarioDB()
        app.listen(port, () => {
            console.log(`Aplicacion ejecutandose en el puerto ---> ${port}`)
        })
    })
    .catch(() => console.log("Fallo la conexión a la DB ---> "))