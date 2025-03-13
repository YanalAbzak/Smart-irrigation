const express = require("express");
const router = express.Router();
const db = require("../models/database");

/**
 * Route to fetch all plants from the database
 */
router.get("/", async (req, res) => {
    try {
        const [plants] = await db.execute("SELECT * FROM plants");
        res.json(plants);
    } catch (error) {
        console.error("Error fetching plants:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Route to add a new plant
 */
router.post("/", async (req, res) => {
    const { plantName } = req.body;
    if (!plantName) {
        return res.status(400).json({ message: "Plant name is required" });
    }

    try {
        await db.execute("INSERT INTO plants (name) VALUES (?)", [plantName]);
        res.status(201).json({ message: "Plant added successfully" });
    } catch (error) {
        console.error("Error adding plant:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Route to update a plant's name
 * @param {number} id - The plant ID to update
 */
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { plantName } = req.body;
    if (!plantName) {
        return res.status(400).json({ message: "Plant name is required" });
    }

    try {
        await db.execute("UPDATE plants SET name = ? WHERE ID = ?", [plantName, id]);
        res.json({ message: "Plant updated successfully" });
    } catch (error) {
        console.error("Error updating plant:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Route to delete a plant by ID
 * @param {number} id - The plant ID to delete
 */
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute("DELETE FROM plants WHERE ID = ?", [id]);
        res.json({ message: "Plant deleted successfully" });
    } catch (error) {
        console.error("Error deleting plant:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
