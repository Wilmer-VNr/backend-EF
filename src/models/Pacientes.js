import { Schema, model } from 'mongoose';

const pacienteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    fecha_nacimiento: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true,
        enum: ['Masculino', 'Femenino', 'Otro']
    },
    ciudad: {
        type: String,
        required: true,
        maxlength: 50
    },
    direccion: {
        type: String,
        required: true,
        maxlength: 100
    },
    telefono: {
        type: String,
        required: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

export default model('Paciente', pacienteSchema);
