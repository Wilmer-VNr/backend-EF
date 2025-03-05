
import express from 'express';
import {verificarAutenticacion} from '../helpers/crearJWT.js';
import {
  obtenerCitas,
  crearCita,
  actualizarCita,
  eliminarCita
} from '../controllers/citas_controller.js';

const router = express.Router();

// Obtener todas las citas
router.get('/ver-citas', verificarAutenticacion,obtenerCitas);

// Registrar una nueva cita
router.post('/registrar-citas', verificarAutenticacion,crearCita);

// Actualizar una cita
router.put('/:citaId', verificarAutenticacion,actualizarCita);

// Eliminar una cita
router.delete('/:citaId', verificarAutenticacion,eliminarCita);

export default router;
