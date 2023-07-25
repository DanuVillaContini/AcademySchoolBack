const express = require('express')
const mongoose = require("mongoose");
const alumnosRouter = require('./src/routes/alumnos.route');

require("dotenv").config()

const app = express()
const port = process.env.PORT

//
app.use("/alumnos", alumnosRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB: 'pruebaFinalProject' CONECTADA")
        app.listen(port, () => {
            console.log(`Aplicacion ejecutandose en el puerto ---> ${port}`)
        })
    })
    .catch(() => console.log("Fallo la conexión a la DB ---> "))