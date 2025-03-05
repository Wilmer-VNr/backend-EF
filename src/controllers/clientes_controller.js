import Cliente from '../models/Clientes.js';  // Importación correcta

// Obtener los clientes
const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json({
      clientes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los clientes',
    });
  }
};

// Registrar un nuevo cliente
const registrarCliente = async (req, res) => {

  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ message: "Lo sentimos, no puedes dejar campos vacíos." });
  }
  const { cedula, nombre, apellido, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;

  try {
    // Verificar si ya existe un cliente con el mismo email
    const clienteExistente = await Cliente.findOne({ email });

    if (clienteExistente) {
      return res.status(400).json({
        msg: 'Ya existe un cliente con ese correo electrónico',
      });
    }

    const nuevoCliente = new Cliente({
      cedula,
      nombre,
      apellido,
      ciudad,
      email,
      direccion,
      telefono,
      fecha_nacimiento
    });

    await nuevoCliente.save();

    return res.status(201).json({
      msg: 'Cliente registrado exitosamente',
      cliente: nuevoCliente,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al registrar el cliente',
    });
  }
};

// Actualizar datos de un cliente
const actualizarCliente = async (req, res) => {
  const { clienteId } = req.params;
  const { cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento } = req.body;

  try {
    const clienteExistente = await Cliente.findById(clienteId);
    if (!clienteExistente) {
      return res.status(404).json({
        msg: 'Cliente no encontrado',
      });
    }

    clienteExistente.cedula = cedula || clienteExistente.cedula;
    clienteExistente.nombre = nombre || clienteExistente.nombre;
    clienteExistente.apellido = apellido || clienteExistente.apellido;
    clienteExistente.fecha_nacimiento = fecha_nacimiento || clienteExistente.fecha_nacimiento;
    clienteExistente.ciudad = ciudad || clienteExistente.ciudad;
    clienteExistente.direccion = direccion || clienteExistente.direccion;
    clienteExistente.telefono = telefono || clienteExistente.telefono;
    clienteExistente.email = email || clienteExistente.email;

    await clienteExistente.save();

    return res.status(200).json({
      msg: 'Cliente actualizado correctamente',
      cliente: clienteExistente,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al actualizar el cliente',
    });
  }
};

// Eliminar un cliente
const eliminarCliente = async (req, res) => {
  const { clienteId } = req.params;

  try {
    const clienteExistente = await Cliente.findById(clienteId);
    if (!clienteExistente) {
      return res.status(404).json({
        msg: 'Cliente no encontrado',
      });
    }

    await Cliente.findByIdAndDelete(clienteId);

    return res.status(200).json({
      msg: 'Cliente eliminado correctamente',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al eliminar el cliente',
    });
  }
};

export {
  obtenerClientes,
  registrarCliente,
  actualizarCliente,
  eliminarCliente,
};
