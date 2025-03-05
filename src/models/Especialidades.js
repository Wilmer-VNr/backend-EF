import { Schema, model } from 'mongoose';

// 📌 Especialidades Schema
const especialidadSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 20
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    descripcion: {
        type: String,
        maxlength: 200
    }
}, { timestamps: true });

export default model('Especialidad', especialidadSchema);
