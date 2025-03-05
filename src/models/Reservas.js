import { Schema, model } from 'mongoose';

const reservaSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
       
    },
    descripcion: {
        type: String,
        
    },
    id_cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    id_vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true
    }
}, { timestamps: true });

export default model('Reserva', reservaSchema);
