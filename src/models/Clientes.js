import { Schema, model } from 'mongoose';

const clienteSchema = new Schema({
    cedula: {
        type: String,
        required: true,
        unique: true
        
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
      
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
       
    },
    ciudad: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true,
        
    },
    telefono: {
        type: String,
        required: true,
        unique: true
    },  

    fecha_nacimiento: {
        type: String,
        required: true
    },
  
}, { timestamps: true });

export default model('Cliente', clienteSchema);
