
const express = require('express')
const mongoose = require("mongoose");
const alumnoRouter = require('./src/routes/alumnos.route');
const personalRouter = require('./src/routes/personal.route');
const materiaRouter = require('./src/routes/materia.route');
const { iniciarSuperUsuarioDB, iniciarInstitutoDB } = require("./src/utils/inicio.utils");
const yearRouter = require('./src/routes/year.route');
const authRouter = require('./src/routes/auth.route');
const institutoRouter = require('./src/routes/institucion.route')
const cors = require('cors')

require("dotenv").config()

const app = express()
app.use(cors())

const port = process.env.PORT

app.use(express.json({ limit: "50mb" }))

app.use("/alumno", alumnoRouter)
app.use("/personal", personalRouter)
app.use("/materias", materiaRouter)
app.use("/year",yearRouter)
app.use("/auth", authRouter)
app.use("/instituto", institutoRouter)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB: 'pruebaFinalProject' CONECTADA")
        iniciarSuperUsuarioDB()
        iniciarInstitutoDB()
        app.listen(port, () => {
            console.log(`Aplicacion ejecutandose en el puerto ---> ${port}`)
        })
    })
    .catch(() => console.log("Fallo la conexión a la DB ---> "))