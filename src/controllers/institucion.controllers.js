const Institucion = require("../models/institucion.model")

const updateInstitucion = async (req, res) =>{
try {
    const institucion = await Institucion.findOne()
    if(!institucion){
        return res.status(404).json({mensaje:"Institucion no encontrada"});
        
    }
    if (institucion.datosActualizados){
        return res.status(400).json({mensaje:"Los datos de la institucion ya han sido actualizados no puedes volver a hacerlos"});
    }
    institucion.nombreInstituto = req.body.nombreInstituto || institucion.nombreInstituto;
        institucion.telefonoInstituto = req.body.telefonoInstituto || institucion.telefonoIntituto;
        institucion.correoInstituto = req.body.correoInstituto || institucion.correoInstituto;
        institucion.direccionInstituto = req.body.direccionInstituto || institucion.direccionInstituto;
        institucion.datosActualizados = true;

        await institucion.save();

        res.status(200).json({mensaje: 'Institución actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la institución:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la institución' });
    }
}




module.exports = {
    updateInstitucion
}

