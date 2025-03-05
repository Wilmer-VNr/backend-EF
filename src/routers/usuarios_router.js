import {Router} from 'express';
import {login} from '../controllers/usuarios_controller.js';

const router = Router();

//Rutas públicas
router.post('/login', login);

export default router;