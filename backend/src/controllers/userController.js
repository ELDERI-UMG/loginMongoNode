const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Listar todos los usuarios (sin password)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener usuarios" });
  }
};

// Crear usuario
exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email ya registrado" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hash, role });
    await user.save();
    res.status(201).json({ msg: "Usuario creado" });
  } catch (err) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, role } = req.body;
  try {
    const updateData = { email, role };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    res.json({ msg: "Usuario actualizado", user });
  } catch (err) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    res.json({ msg: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
