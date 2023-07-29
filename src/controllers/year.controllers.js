const Year = require("../models/year.model")

// const showYear = async (req, res) => {
//     try {
//         const year = await Year.findOne({idAlumno, anio})
//         if (year === null) {
//             res.status(404)
//             return res.json({ message: "Id no encontrado" })
//         }
//         const anioRegex= new RegExp(req.query.anio)
//         const filters={
//             anio:{$regex:anioRegex}
//         }
//         const cuota = await Year.find(filters)
//     }
//     catch(error){ console.log(error)
//         res.status(500).json({message:"error al mostrar la cuota"})
//     }

// //recibir param idAlumno
// //anio cursando

// //con esto hacer filtrado y mostrar

// }
const updateYear = async(req,res)=>{
    const idYear = req.params.id; // Obtener el id del documento Year desde los parámetros de la solicitud
    const cuotaName = req.params.cuota; // Obtener el nombre de la cuota desde los parámetros de la solicitud
  
    // Verificar si el nombre de la cuota recibida es válido
    const validCuotas = ["cuotaUno", "cuotaDos", "cuotaTres", "cuotaCuatro", "cuotaCinco", "cuotaSeis"];
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
  
      res.json({ message: 'Estado de la cuota'+cuotaName+'alternado correctamente', year });
    } catch (error) {
      res.status(500).json({ message: "Error al alternar el estado de la cuota", error: error.message });
    }
}
module.exports = {updateYear}