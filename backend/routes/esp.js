const express = require("express");
const router = express.Router();
const db = require("../models/database");

// Route for receiving sensor data from ESP device
router.get("/", async (req, res) => {
    try {
        const { temperature, lightIntensity, soilMoisture, treeId, isDeviceRunning } = req.query;

        // Basic data validation
        if (!temperature || !lightIntensity || !soilMoisture || !treeId) {
            return res.status(400).json({ message: "Missing required parameters" });
        }

        // Update sensor data in the database
        await updateSensorRecord(treeId, "temperature", parseFloat(temperature), isDeviceRunning || 0);
        await updateSensorRecord(treeId, "light_intensity", parseFloat(lightIntensity), isDeviceRunning || 0);
        await updateSensorRecord(treeId, "soil_moisture", parseFloat(soilMoisture), isDeviceRunning || 0);

        res.status(201).json({ message: "Data recorded successfully" });

    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Updates or inserts a new sensor record in the database
 * @param {number} treeId - The ID of the tree associated with the sensor
 * @param {string} sensorType - The type of sensor (temperature, light, moisture)
 * @param {number} sensorValue - The recorded sensor value
 * @param {boolean} isDeviceRunning - Status indicating if the device is running
 */
async function updateSensorRecord(treeId, sensorType, sensorValue, isDeviceRunning) {
    const [existingRecord] = await db.execute(
        `SELECT * FROM datasensors 
     WHERE id_threes = ? AND name_sensor = ? AND date = CURDATE()`,
        [treeId, sensorType]
    );

    if (existingRecord.length > 0) {
        const currentAvg = existingRecord[0].avg;
        const currentMin = existingRecord[0].min_value;
        const currentMax = existingRecord[0].max_value;

        // Compute new average value
        const updatedAvg = (currentAvg + sensorValue) / 2;
        const updatedMin = Math.min(currentMin, sensorValue);
        const updatedMax = Math.max(currentMax, sensorValue);

        // Update existing record
        await db.execute(
            `UPDATE datasensors 
       SET avg = ?, min_value = ?, max_value = ?, isRunning = ? 
       WHERE id_threes = ? AND name_sensor = ? AND date = CURDATE()`,
            [updatedAvg, updatedMin, updatedMax, isDeviceRunning, treeId, sensorType]
        );
    } else {
        // Insert a new record if no existing data is found
        await db.execute(
            `INSERT INTO datasensors 
       (id_threes, name_sensor, avg, min_value, max_value, date, isRunning) 
       VALUES (?, ?, ?, ?, ?, CURDATE(), ?)`,
            [treeId, sensorType, sensorValue, sensorValue, sensorValue, isDeviceRunning]
        );
    }
}

module.exports = router;