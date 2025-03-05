import express from 'express';
import {verificarAutenticacion} from '../helpers/crearJWT.js';
import {
  obtenerPacientes,
  registrarPaciente,
  actualizarPaciente,
  eliminarPaciente
} from '../controllers/pacientes_controller.js';

const router = express.Router();

// Obtener todos los pacientes
router.get('/obtener-pacientes', obtenerPacientes);

// Registrar un nuevo paciente
router.post('/registrar-paciente', registrarPaciente);

// Actualizar un paciente
router.put('/:pacienteId', actualizarPaciente);

// Eliminar un paciente
router.delete('/:pacienteId', eliminarPaciente);

export default router;
