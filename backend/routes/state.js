const express = require("express");
const fs = require("fs").promises; // Use async file handling
const router = express.Router();
const configFilePath = "Inside_information.json";

/**
 * Get the entire system configuration
 */
router.get("/", async (req, res) => {
    try {
        const configData = await fs.readFile(configFilePath, "utf8");
        res.json(JSON.parse(configData));
    } catch (error) {
        console.error("Error reading configuration file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Update the entire system configuration
 */
router.put("/", async (req, res) => {
    try {
        await fs.writeFile(configFilePath, JSON.stringify(req.body, null, 2));
        res.json({ message: "Configuration updated successfully" });
    } catch (error) {
        console.error("Error updating configuration file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Update only the system state
 */
router.put("/state", async (req, res) => {
    try {
        const { state } = req.body;
        const configData = JSON.parse(await fs.readFile(configFilePath, "utf8"));
        configData.state = state;

        await fs.writeFile(configFilePath, JSON.stringify(configData, null, 2));
        res.json({ message: "State updated successfully" });
    } catch (error) {
        console.error("Error updating system state:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Update a specific mode (tempMode, soilMoistureMode, sabbathMode)
 */
router.put("/update-mode/:mode", async (req, res) => {
    try {
        const { mode } = req.params;
        const updatedModeData = req.body;
        const configData = JSON.parse(await fs.readFile(configFilePath, "utf8"));

        if (!configData[mode]) {
            return res.status(400).json({ message: "Invalid mode" });
        }

        configData[mode] = { ...configData[mode], ...updatedModeData };
        await fs.writeFile(configFilePath, JSON.stringify(configData, null, 2));
        res.json({ message: `${mode} updated successfully` });
    } catch (error) {
        console.error(`Error updating mode ${mode}:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
