import Cita from '../models/Citas.js';
import Paciente from '../models/Pacientes.js';
import Especialidad from '../models/Especialidades.js';

// Crear una nueva cita
export const crearCita = async (req, res) => {
    try {
        const { codigo, descripcion, id_paciente, id_especialidad } = req.body;

        // Verificar que el paciente y especialidad existan
        const paciente = await Paciente.findById(id_paciente);
        const especialidad = await Especialidad.findById(id_especialidad);

        if (!paciente || !especialidad) {
            return res.status(400).json({ mensaje: "Paciente o especialidad no encontrados." });
        }

        // Crear la cita
        const cita = new Cita({ codigo, descripcion, id_paciente, id_especialidad });
        await cita.save();
        res.status(201).json(cita);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear la cita." });
    }
};

// Obtener todas las citas
export const obtenerCitas = async (req, res) => {
    try {
        const citas = await Cita.find().populate('id_paciente').populate('id_especialidad');
        res.status(200).json(citas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener las citas." });
    }
};

// Obtener una cita por ID
export const obtenerCitaPorId = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id).populate('id_paciente').populate('id_especialidad');
        if (!cita) {
            return res.status(404).json({ mensaje: "Cita no encontrada." });
        }
        res.status(200).json(cita);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener la cita." });
    }
};

// Actualizar una cita
export const actualizarCita = async (req, res) => {
    try {
        const { codigo, descripcion, id_paciente, id_especialidad } = req.body;

        // Verificar que el paciente y especialidad existan
        const paciente = await Paciente.findById(id_paciente);
        const especialidad = await Especialidad.findById(id_especialidad);

        if (!paciente || !especialidad) {
            return res.status(400).json({ mensaje: "Paciente o especialidad no encontrados." });
        }

        const citaActualizada = await Cita.findByIdAndUpdate(
            req.params.id, 
            { codigo, descripcion, id_paciente, id_especialidad }, 
            { new: true }
        );
        
        if (!citaActualizada) {
            return res.status(404).json({ mensaje: "Cita no encontrada." });
        }

        res.status(200).json(citaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar la cita." });
    }
};

// Eliminar una cita
export const eliminarCita = async (req, res) => {
    try {
        const citaEliminada = await Cita.findByIdAndDelete(req.params.id);
        if (!citaEliminada) {
            return res.status(404).json({ mensaje: "Cita no encontrada." });
        }
        res.status(200).json({ mensaje: "Cita eliminada exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar la cita." });
    }
};
