
import express from 'express';
import {verificarAutenticacion} from '../helpers/crearJWT.js';
import {
  obtenerReservas,
  obtenerReservaPorId,
  crearReserva,
  actualizarReserva,
  eliminarReserva
} from '../controllers/reservas_controller.js';

const router = express.Router();

// Obtener todas las citas
router.get('/ver-reserva',verificarAutenticacion, obtenerReservas);

router.get('/ver-reserva-por-id', verificarAutenticacion, obtenerReservaPorId)

// Registrar una nueva cita
router.post('/registrar-reserva', verificarAutenticacion, crearReserva);

// Actualizar una cita
router.put('/actualizar-reserva/:reservaId', verificarAutenticacion, actualizarReserva);

// Eliminar una cita
router.delete('/eliminar-reserva/:reservaId', verificarAutenticacion, eliminarReserva);

export default router;
