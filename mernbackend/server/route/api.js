// server/routes/api.js
const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather'); // Import the Weather model

// Create a new weather record
router.post('/weather', async (req, res) => {
  try {
    const { city, temperature, description } = req.body;
    const weather = new Weather({ city, temperature, description });
    await weather.save();
    res.status(201).json(weather);
  } catch (error) {
    res.status(500).json({ error: 'Unable to save weather data' });
  }
});

// Retrieve weather data
router.get('/weather', async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

module.exports = router;
