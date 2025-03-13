const express = require("express");
const fs = require("fs");
const router = express.Router();
const configFilePath = "Inside_information.json";

/**
 * Route to retrieve all configuration settings
 */
router.get("/", (req, res) => {
    const configData = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
    res.json(configData);
});

/**
 * Route to update all configuration settings
 */
router.put("/", (req, res) => {
    const updatedConfig = req.body;
    fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2));
    res.json({ message: "Configuration updated successfully" });
});

/**
 * Route to update only the system state
 */
router.put("/state", (req, res) => {
    const { state } = req.body;
    const configData = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
    configData.state = state;
    fs.writeFileSync(configFilePath, JSON.stringify(configData, null, 2));
    res.json({ message: "State updated successfully" });
});

/**
 * Route to update specific mode settings
 * @param {string} mode - The mode to be updated
 */
router.put("/update-mode/:mode", (req, res) => {
    const { mode } = req.params;
    const updatedModeData = req.body;

    const configData = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
    configData[mode] = updatedModeData;
    fs.writeFileSync(configFilePath, JSON.stringify(configData, null, 2));

    res.json({ message: `${mode} updated successfully` });
});

module.exports = router;
