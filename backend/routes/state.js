const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const configFilePath = "Inside_information.json";

/**
 * Route to retrieve the current system configuration from JSON
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
 * Route to update the entire system configuration in JSON
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
 * Route to update only the system state (1 = manual, 2 = automatic)
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

module.exports = router;
