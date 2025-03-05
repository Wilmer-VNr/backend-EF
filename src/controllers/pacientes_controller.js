// controllers/pacientes_controller.js
import Paciente from '../models/Pacientes.js';  // Importación correcta

// Obtener los pacientes
const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.status(200).json({
      pacientes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los pacientes',
    });
  }
};

// Registrar un nuevo paciente
const registrarPaciente = async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, genero, ciudad, direccion, telefono, email } = req.body;

  try {
    // Verificar si ya existe un paciente con el mismo email
    const pacienteExistente = await Paciente.findOne({ email });

    if (pacienteExistente) {
      return res.status(400).json({
        msg: 'Ya existe un paciente con ese correo electrónico',
      });
    }

    const nuevoPaciente = new Paciente({
      nombre,
      apellido,
      fecha_nacimiento,
      genero,
      ciudad,
      direccion,
      telefono,
      email,
    });

    await nuevoPaciente.save();

    return res.status(201).json({
      msg: 'Paciente registrado exitosamente',
      paciente: nuevoPaciente,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al registrar el paciente',
    });
  }
};

// Actualizar datos de un paciente
const actualizarPaciente = async (req, res) => {
  const { pacienteId } = req.params;
  const { nombre, apellido, fecha_nacimiento, genero, ciudad, direccion, telefono, email } = req.body;

  try {
    const pacienteExistente = await Paciente.findById(pacienteId);
    if (!pacienteExistente) {
      return res.status(404).json({
        msg: 'Paciente no encontrado',
      });
    }

    pacienteExistente.nombre = nombre || pacienteExistente.nombre;
    pacienteExistente.apellido = apellido || pacienteExistente.apellido;
    pacienteExistente.fecha_nacimiento = fecha_nacimiento || pacienteExistente.fecha_nacimiento;
    pacienteExistente.genero = genero || pacienteExistente.genero;
    pacienteExistente.ciudad = ciudad || pacienteExistente.ciudad;
    pacienteExistente.direccion = direccion || pacienteExistente.direccion;
    pacienteExistente.telefono = telefono || pacienteExistente.telefono;
    pacienteExistente.email = email || pacienteExistente.email;

    await pacienteExistente.save();

    return res.status(200).json({
      msg: 'Paciente actualizado correctamente',
      paciente: pacienteExistente,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al actualizar el paciente',
    });
  }
};

// Eliminar un paciente
const eliminarPaciente = async (req, res) => {
  const { pacienteId } = req.params;

  try {
    const pacienteExistente = await Paciente.findById(pacienteId);
    if (!pacienteExistente) {
      return res.status(404).json({
        msg: 'Paciente no encontrado',
      });
    }

    await Paciente.findByIdAndDelete(pacienteId);

    return res.status(200).json({
      msg: 'Paciente eliminado correctamente',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al eliminar el paciente',
    });
  }
};

export {
  obtenerPacientes,
  registrarPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
