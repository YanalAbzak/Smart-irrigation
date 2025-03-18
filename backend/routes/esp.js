const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const configFilePath = "Inside_information.json";

/**
 * Route to receive and store sensor data from ESP device
 */
router.get("/", async (req, res) => {
    try {
        const { temperature, lightIntensity, soilMoisture } = req.query;

        if (!temperature || !lightIntensity || !soilMoisture) {
            return res.status(400).json({ message: "Missing required parameters" });
        }

        const configData = JSON.parse(await fs.readFile(configFilePath, "utf8"));
        configData.lastSensorData = { temperature, lightIntensity, soilMoisture };

        await fs.writeFile(configFilePath, JSON.stringify(configData, null, 2));
        res.status(201).json({ message: "Sensor data recorded successfully" });
    } catch (error) {
        console.error("Error saving sensor data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
