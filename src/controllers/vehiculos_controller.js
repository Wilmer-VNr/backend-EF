import Vehiculo from '../models/Vehiculos.js';

// Obtener todos los vehículos
const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.status(200).json({
      vehiculos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener vehículos',
    });
  }
};

// Registrar un nuevo vehículo
const registrarVehiculo = async (req, res) => {

  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ message: "Lo sentimos, no puedes dejar campos vacíos." });
  }

  const { marca, modelo, anio, placa, color, tipo_vehiculo, kilometraje, descripcion } = req.body;

  try {
    const vehiculoExistente = await Vehiculo.findOne({ placa });

    if (vehiculoExistente) {
      return res.status(400).json({
        msg: 'Ya existe un vehículo con esa placa.',
      });
    }

    const nuevoVehiculo = new Vehiculo({
      marca, modelo, anio, placa, color, tipo_vehiculo, kilometraje, descripcion
    });

    await nuevoVehiculo.save();

    return res.status(201).json({
      msg: 'Vehículo registrado exitosamente',
      vehiculo: nuevoVehiculo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al registrar el vehículo',
    });
  }
};

// Actualizar vehículo
const actualizarVehiculo = async (req, res) => {
  const { vehiculoId } = req.params;
  const { marca, modelo, anio, placa, color, tipo_vehiculo, kilometraje, descripcion } = req.body;

  try {
    const vehiculoExistente = await Vehiculo.findById(vehiculoId);
    if (!vehiculoExistente) {
      return res.status(404).json({
        msg: 'Vehículo no encontrado',
      });
    }

    vehiculoExistente.marca = marca || vehiculoExistente.marca;
    vehiculoExistente.modelo = modelo || vehiculoExistente.modelo;
    vehiculoExistente.anio = anio || vehiculoExistente.anio;
    vehiculoExistente.placa = placa || vehiculoExistente.placa;
    vehiculoExistente.color = color || vehiculoExistente.color;
    vehiculoExistente.tipo_vehiculo = tipo_vehiculo || vehiculoExistente.tipo_vehiculo;
    vehiculoExistente.kilometraje = kilometraje || vehiculoExistente.kilometraje;
    vehiculoExistente.descripcion = descripcion || vehiculoExistente.descripcion;

    await vehiculoExistente.save();

    return res.status(200).json({
      msg: 'Vehículo actualizado correctamente',
      vehiculo: vehiculoExistente,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al actualizar el vehículo',
    });
  }
};

// Eliminar vehículo
const eliminarVehiculo = async (req, res) => {
  const { vehiculoId } = req.params;

  try {
    const vehiculoExistente = await Vehiculo.findById(vehiculoId);
    if (!vehiculoExistente) {
      return res.status(404).json({
        msg: 'Vehículo no encontrado',
      });
    }

    await Vehiculo.findByIdAndDelete(vehiculoId);

    return res.status(200).json({
      msg: 'Vehículo eliminado correctamente',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al eliminar el vehículo',
    });
  }
};

export {
  obtenerVehiculos,
  registrarVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
};


   