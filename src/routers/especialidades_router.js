import express from "express";
import {verificarAutenticacion} from '../helpers/crearJWT.js';
import {
  obtenerEspecialidades,
  registrarEspecialidad,
  actualizarEspecialidad,
  eliminarEspecialidad,
} from "../controllers/especialidad_controller.js";

const router = express.Router();

// Obtener todas las especialidades
router.get("/ver-especialidad", verificarAutenticacion,obtenerEspecialidades);

// Registrar una nueva especialidad
router.post("/registrar-especialidad", verificarAutenticacion,registrarEspecialidad);

// Actualizar una especialidad
router.put("/:especialidadId", verificarAutenticacion,actualizarEspecialidad);

// Eliminar una especialidad
router.delete("/:especialidadId", verificarAutenticacion,eliminarEspecialidad);

export default router;
