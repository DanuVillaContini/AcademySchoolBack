const Year = require("../models/year.model")

const showYear = async (req, res) => {
    const idYear = req.params.id;

    try {
      const year = await Year.findById(idYear);
  
      if (!year) {
        return res.status(404).json({ message: "Year no encontrado" });
      }
  
      // Obtener todas las cuotas y sus estados
      const cuotas = {
        cuota1: year.cuota1,
        cuota2: year.cuota2,
        cuota3: year.cuota3,
        cuota4: year.cuota4,
        cuota5: year.cuota5,
        cuota6: year.cuota6,
        cuota7: year.cuota7,
        cuota8: year.cuota8,
        cuota9: year.cuota9,
        cuota10: year.cuota10
      };
      console.log(cuotas);
      const mesActual = new Date().getMonth() - 1;
      let alDia = true
      for (let i = 1; i <= mesActual; i++) {
          if (cuotas["cuota" + i] === false) alDia = false
      }
  
      res.json({cuotas, alDia});
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las cuotas", error: error.message });
    }
}


const updateYear = async (req, res) => {
    const idYear = req.params.id; 
    const cuotaName = req.params.cuota; 


    const validCuotas = ["cuota1", "cuota2", "cuota3", "cuota4", "cuota5", "cuota6","cuota7","cuota8","cuota9","cuota10"];
    if (!validCuotas.includes(cuotaName)) {
        return res.status(400).json({ message: "Nombre de cuota no válido" });
    }

    try {
        const year = await Year.findById(idYear);

        if (!year) {
            return res.status(404).json({ message: "Year no encontrado" });
        }

        // Alternar el estado de la cuota específica
        year[cuotaName] = !year[cuotaName];

        await year.save();

        res.json({ message: 'Estado de la cuota' + cuotaName + 'alternado correctamente', year });
    } catch (error) {
        res.status(500).json({ message: "Error al alternar el estado de la cuota", error: error.message });
    }
}
module.exports = { updateYear, showYear }