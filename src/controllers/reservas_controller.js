import Reserva from '../models/Reservas.js'; 
import Cliente from '../models/Clientes.js'; 
import Vehiculo from '../models/Vehiculos.js'; 

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ message: "Lo sentimos, no puedes dejar campos vacíos." });
  }

  try {
    const { codigo, descripcion, id_cliente, id_vehiculo } = req.body;

    // Verificar que el cliente y el vehículo existan
    const cliente = await Cliente.findById(id_cliente);
    const vehiculo = await Vehiculo.findById(id_vehiculo);

    if (!cliente || !vehiculo) {
      return res.status(400).json({ mensaje: "Cliente o vehículo no encontrados." });
    }

    // Crear la reserva
    const reserva = new Reserva({ codigo, descripcion, id_cliente, id_vehiculo });
    await reserva.save();
    res.status(201).json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la reserva." });
  }
};

// Obtener todas las reservas
export const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate('id_cliente')  // Poblamos los detalles del cliente
      .populate('id_vehiculo'); // Poblamos los detalles del vehículo
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener las reservas." });
  }
};

// Obtener una reserva por ID
export const obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id)
      .populate('id_cliente')  // Poblamos los detalles del cliente
      .populate('id_vehiculo'); // Poblamos los detalles del vehículo

    if (!reserva) {
      return res.status(404).json({ mensaje: "Reserva no encontrada." });
    }

    res.status(200).json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener la reserva." });
  }
};

// Actualizar una reserva
export const actualizarReserva = async (req, res) => {
  try {
    const { codigo, descripcion, id_cliente, id_vehiculo } = req.body;

    // Verificar que el cliente y el vehículo existan
    const cliente = await Cliente.findById(id_cliente);
    const vehiculo = await Vehiculo.findById(id_vehiculo);

    if (!cliente || !vehiculo) {
      return res.status(400).json({ mensaje: "Cliente o vehículo no encontrados." });
    }

    const reservaActualizada = await Reserva.findByIdAndUpdate(
      req.params.id,
      { codigo, descripcion, id_cliente, id_vehiculo },
      { new: true }
    );

    if (!reservaActualizada) {
      return res.status(404).json({ mensaje: "Reserva no encontrada." });
    }

    res.status(200).json(reservaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar la reserva." });
  }
};

// Eliminar una reserva
export const eliminarReserva = async (req, res) => {
  try {
    const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
    if (!reservaEliminada) {
      return res.status(404).json({ mensaje: "Reserva no encontrada." });
    }
    res.status(200).json({ mensaje: "Reserva eliminada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la reserva." });
  }
};
