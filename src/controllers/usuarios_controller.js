import Usuarios from "../models/Usuarios.js";
import { generarJWT } from "../helpers/crearJWT.js";
const login = async (req, res) => {

  // Paso 1: Tomar los datos del request (correo electrónico y contraseña)
  const { email, password } = req.body;

  //Paso 2: Validar datos
  if(Object.values(req.body).includes("")) return res.status(400).json({message: "Lo sentimos, no puedes dejar campos vacíos."});

  const usuarioBDD = await Usuarios.findOne({ email }).select("-__v -updatedAt -createdAt");

  if(!usuarioBDD) return res.status(400).json({message: "El correo electrónico no se encuentra registrado."});

const verificarPassword = await usuarioBDD.matchPassword(password);
if (!verificarPassword) return res.status(400).json({message: "Contraseña incorrecta"});

  // Paso 3: Interactuar con la base de datos
  const token = generarJWT(usuarioBDD._id);
  res.status(200).json({usuarioBDD,token});

  }
  export { 
  login

  };


  