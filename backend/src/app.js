require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Configurar CORS para permitir peticiones desde cualquier origen
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Ruta de health check para verificar conexión
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando' });
});

// Endpoints
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("Error MongoDB:", err));

module.exports = app;
