//Requerir los modulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import clienteRoutes from './routers/clientes_router.js'
import vehiculoRoutes from './routers/vehiculos_router.js';
import reservaRoutes from './routers/reservas_router.js';
import userRoutes from './routers/usuarios_router.js';

//Inicializaciones
const app = express()
dotenv.config()

//Configuraciones
app.set('port',process.env.PORT || 4000)
app.use(cors())


// Middlewares 
app.use(express.json())


// Variables globales

// Rutas 
app.get('/',(req,res)=>{
    res.send("Server online 🐱‍🏍")})


app.use('/api/',clienteRoutes)
app.use('/api/',vehiculoRoutes);
app.use('/api/',reservaRoutes);
app.use('/api/',userRoutes);

//Rutas no encontradas
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))
// Exportar la instancia de express por medio de app
export default  app