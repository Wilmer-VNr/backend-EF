import Especialidad from '../models/Especialidades.js';

// Obtener todas las especialidades
const obtenerEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.find();
    res.status(200).json({
      especialidades,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener especialidades',
    });
  }
};

// Registrar una nueva especialidad
const registrarEspecialidad = async (req, res) => {

  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ message: "Lo sentimos, no puedes dejar campos vacíos." });
}
  const { codigo, nombre, descripcion } = req.body;

  try {
    const especialidadExistente = await Especialidad.findOne({ codigo });

    if (especialidadExistente) {
      return res.status(400).json({
        msg: 'Ya existe una especialidad con ese código',
      });
    }

    const nuevaEspecialidad = new Especialidad({
      codigo,
      nombre,
      descripcion,
    });

    await nuevaEspecialidad.save();

    return res.status(201).json({
      msg: 'Especialidad registrada exitosamente',
      especialidad: nuevaEspecialidad,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al registrar la especialidad',
    });
  }
};

// Actualizar especialidad
const actualizarEspecialidad = async (req, res) => {
  const { especialidadId } = req.params;
  const { codigo, nombre, descripcion } = req.body;

  try {
    const especialidadExistente = await Especialidad.findById(especialidadId);
    if (!especialidadExistente) {
      return res.status(404).json({
        msg: 'Especialidad no encontrada',
      });
    }

    especialidadExistente.codigo = codigo || especialidadExistente.codigo;
    especialidadExistente.nombre = nombre || especialidadExistente.nombre;
    especialidadExistente.descripcion = descripcion || especialidadExistente.descripcion;

    await especialidadExistente.save();

    return res.status(200).json({
      msg: 'Especialidad actualizada correctamente',
      especialidad: especialidadExistente,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al actualizar la especialidad',
    });
  }
};

// Eliminar especialidad
const eliminarEspecialidad = async (req, res) => {
  const { especialidadId } = req.params;

  try {
    const especialidadExistente = await Especialidad.findById(especialidadId);
    if (!especialidadExistente) {
      return res.status(404).json({
        msg: 'Especialidad no encontrada',
      });
    }

    await Especialidad.findByIdAndDelete(especialidadId);

    return res.status(200).json({
      msg: 'Especialidad eliminada correctamente',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al eliminar la especialidad',
    });
  }
};

export {
  obtenerEspecialidades,
  registrarEspecialidad,
  actualizarEspecialidad,
  eliminarEspecialidad,
};
