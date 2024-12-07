const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // Puerto que Render asignará

// Habilitar CORS
app.use(cors());

// Ruta para obtener direcciones
app.get("/directions", async (req, res) => {
  const { start, end } = req.query; // Obtener parámetros de la solicitud
  const API_KEY = "5b3ce3597851110001cf6248b48e1e3a23e64a9b02e19cd97b30b2e498d00b53"; // Reemplaza con tu clave
  const API_URL = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${start}&end=${end}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener datos de OpenRouteService");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error al obtener datos de OpenRouteService:", error);
    res.status(500).json({ error: "Error al obtener la ruta" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Proxy server corriendo en el puerto ${PORT}`);
});
