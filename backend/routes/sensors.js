const express = require("express");
const { SensorData } = require("../models");
const router = express.Router();

/**
 * Route to fetch all sensor data from the database
 */
router.get("/", async (req, res) => {
    try {
        const sensorData = await SensorData.findAll();
        res.json(sensorData);
    } catch (error) {
        console.error("Error fetching sensor data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Route to add new sensor data
 */
router.post("/", async (req, res) => {
    try {
        const sensorData = await SensorData.create(req.body);
        res.status(201).json(sensorData);
    } catch (error) {
        console.error("Error adding sensor data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;