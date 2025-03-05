import { Schema, model } from 'mongoose';

const vehiculoSchema = new Schema({
   
    marca: {
        type: String,
        required: true,
        trim: true
    },
    modelo: {
        type: String,
        required: true,
        trim: true
    },
    anio:{
        type: String,
        required: true,
        trim: true
    },
    placa:{
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    color:{
        type: String,
        required: true,
        trim: true
    },

    tipo_vehiculo:{
        type: String,
        required: true,
        trim: true
    },
    kilometraje:{
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String
    }
}, { timestamps: true });

export default model('Vehiculo', vehiculoSchema);
