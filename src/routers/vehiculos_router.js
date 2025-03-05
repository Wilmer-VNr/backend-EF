import express from "express";
import {verificarAutenticacion} from '../helpers/crearJWT.js';
import {
  obtenerVehiculos,
  registrarVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
} from "../controllers/vehiculos_controller.js";

const router = express.Router();


router.get("/obtener-vehiculo", verificarAutenticacion,obtenerVehiculos);

router.post("/registrar-vehiculo", verificarAutenticacion, registrarVehiculo);

router.put("/actualizar-vehiculo/:vehiculoId", verificarAutenticacion, actualizarVehiculo);


router.delete("/eliminar-vehiculo/:vehiculoId", eliminarVehiculo);

export default router;

