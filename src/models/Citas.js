import { Schema, model } from 'mongoose';

const citaSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 20
    },
    descripcion: {
        type: String,
        maxlength: 255
    },
    id_paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    id_especialidad: {
        type: Schema.Types.ObjectId,
        ref: 'Especialidad',
        required: true
    }
}, { timestamps: true });

export default model('Cita', citaSchema);
