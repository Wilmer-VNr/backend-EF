import express from 'express';
import {verificarAutenticacion} from '../helpers/crearJWT.js';
import {
  obtenerClientes,
  registrarCliente,
  actualizarCliente,
  eliminarCliente
} from '../controllers/clientes_controller.js';

const router = express.Router();

// Obtener todos los pacientes
router.get('/obtener-clientes', verificarAutenticacion, obtenerClientes);

// Registrar un nuevo paciente
router.post('/registrar-cliente', verificarAutenticacion, registrarCliente);

// Actualizar un paciente
router.put('/actualizar-cliente/:clienteId', verificarAutenticacion,actualizarCliente);

// Eliminar un paciente
router.delete('/eliminar-cliente/:clienteId', verificarAutenticacion, eliminarCliente);

export default router;


