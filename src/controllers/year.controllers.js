const Year = require("../models/year.model")

const showYear = async (req, res) => {
    const idYear = req.params.id; // Obtener el id del documento Year desde los parámetros de la solicitud

    try {
      // Buscar el documento Year por su id
      const year = await Year.findById(idYear);
  
      if (!year) {
        return res.status(404).json({ message: "Year no encontrado" });
      }
  
      // Obtener todas las cuotas y sus estados
      const cuotas = {
        cuotaUno: year.cuotaUno,
        cuotaDos: year.cuotaDos,
        cuotaTres: year.cuotaTres,
        cuotaCuatro: year.cuotaCuatro,
        cuotaCinco: year.cuotaCinco,
        cuotaSeis: year.cuotaSeis,
        cuotaSiete: year.cuotaSiete,
        cuotaOcho: year.cuotaOcho,
        cuotaNueve: year.cuotaNueve,
        cuotaDiez: year.cuotaDiez
      };
  
      res.json(cuotas);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las cuotas", error: error.message });
    }
}


const updateYear = async (req, res) => {
    const idYear = req.params.id; // Obtener el id del documento Year desde los parámetros de la solicitud
    const cuotaName = req.params.cuota; // Obtener el nombre de la cuota desde los parámetros de la solicitud

    // Verificar si el nombre de la cuota recibida es válido
    const validCuotas = ["cuotaUno", "cuotaDos", "cuotaTres", "cuotaCuatro", "cuotaCinco", "cuotaSeis","cuotaSiete","cuotaOcho","cuotaNueve","cuotaDiez"];
    if (!validCuotas.includes(cuotaName)) {
        return res.status(400).json({ message: "Nombre de cuota no válido" });
    }

    try {
        // Buscar el documento Year por su id
        const year = await Year.findById(idYear);

        if (!year) {
            return res.status(404).json({ message: "Year no encontrado" });
        }

        // Alternar el estado de la cuota específica
        year[cuotaName] = !year[cuotaName];

        // Guardar los cambios en la base de datos
        await year.save();

        res.json({ message: 'Estado de la cuota' + cuotaName + 'alternado correctamente', year });
    } catch (error) {
        res.status(500).json({ message: "Error al alternar el estado de la cuota", error: error.message });
    }
}
module.exports = { updateYear, showYear }