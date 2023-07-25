const express = require('express')
const mongoose = require("mongoose");
const alumnosRouter = require('./src/routes/alumnos.route');
const personalRouter = require('./src/routes/personal.route');

require("dotenv").config()

const app = express()
const port = process.env.PORT

//Indico a la app que recibira jsons del user
app.use(express.json({ limit: "50mb" }))

//
app.use("/alumnos", alumnosRouter)
app.use("/personal", personalRouter)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB: 'pruebaFinalProject' CONECTADA")
        app.listen(port, () => {
            console.log(`Aplicacion ejecutandose en el puerto ---> ${port}`)
        })
    })
    .catch(() => console.log("Fallo la conexión a la DB ---> "))