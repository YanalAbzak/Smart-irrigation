const express = require("express");
const { SensorData } = require("../models");
const router = express.Router();

/**
 * Route to receive and store sensor data from ESP device
 */
router.post("/", async (req, res) => {
    try {
        const { treeId, temperature, lightIntensity, soilMoisture, isRunning } = req.body;

        if (!treeId || !temperature || !lightIntensity || !soilMoisture) {
            return res.status(400).json({ message: "Missing required parameters" });
        }

        // Insert sensor data into the database
        await SensorData.create({ treeId, temperature, lightIntensity, soilMoisture, isRunning });

        res.status(201).json({ message: "Sensor data recorded successfully" });
    } catch (error) {
        console.error("Error saving sensor data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
