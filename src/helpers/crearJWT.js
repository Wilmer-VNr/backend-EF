import jwt from 'jsonwebtoken';
import Usuarios from '../models/Usuarios.js';

const generarJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
const verificarAutenticacion = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: "No autorizado, token requerido" });
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        // Buscar al usuario en la base de datos
        const usuario = await Usuarios.findById(id).lean().select("-password");

        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        req.usuarioBDD = usuario;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token inválido o expirado" });
    }
};

export { 
    generarJWT,
    verificarAutenticacion 
};

