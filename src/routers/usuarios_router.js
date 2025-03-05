import {Router} from 'express';
import {login, perfil} from '../controllers/usuarios_controller.js';
import {verificarAutenticacion} from '../helpers/crearJWT.js';

const router = Router();

//Rutas públicas
router.post('/login', login);

router.get('/perfil', verificarAutenticacion, perfil)


export default router;