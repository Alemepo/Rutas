const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_API_KEY = "AIzaSyB20Q9jR-kc39RpOgTxTztGtj3jUOOv1H8"; // Tu clave de Google Maps
const GOOGLE_API_URL = "https://maps.googleapis.com/maps/api/directions/json";

app.use(cors());

// Ruta para obtener direcciones
app.get("/directions", async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    console.error("Faltan parámetros 'start' y/o 'end'");
    return res.status(400).json({ error: "Parámetros 'start' y 'end' son requeridos" });
  }

  const url = `${GOOGLE_API_URL}?origin=${start}&destination=${end}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error de Google Directions API: ${response.status} - ${errorText}`);
      throw new Error(`Error de Google Directions API: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error al obtener datos de Google Directions API:", error.message);
    res.status(500).json({ error: "Error al obtener datos de Google Directions API" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
