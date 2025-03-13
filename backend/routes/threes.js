const express = require("express");
const router = express.Router();
const db = require("../models/database");

/**
 * Route to retrieve all tree plantings with associated plant names
 */
router.get("/", async (req, res) => {
    try {
        const [treePlantings] = await db.execute(`
      SELECT trees.*, plants.name AS plant_name 
      FROM trees 
      JOIN plants ON trees.plant_id = plants.ID
    `);
        res.json(treePlantings);
    } catch (error) {
        console.error("Error fetching tree plantings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Route to add a new tree planting
 */
router.post("/", async (req, res) => {
    const { plantId, plantingDate } = req.body;
    if (!plantId || !plantingDate) {
        return res.status(400).json({ message: "Plant ID and planting date are required" });
    }

    try {
        await db.execute("INSERT INTO trees (plant_id, date) VALUES (?, ?)", [plantId, plantingDate]);
        res.status(201).json({ message: "Tree planting recorded successfully" });
    } catch (error) {
        console.error("Error adding tree planting:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Route to update a tree planting record
 * @param {number} id - The tree planting ID to update
 */
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { plantId, plantingDate } = req.body;

    if (!plantId || !plantingDate) {
        return res.status(400).json({ message: "Plant ID and planting date are required" });
    }

    try {
        await db.execute("UPDATE trees SET plant_id = ?, date = ? WHERE id = ?", [plantId, plantingDate, id]);
        res.json({ message: "Tree planting updated successfully" });
    } catch (error) {
        console.error("Error updating tree planting:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Route to delete a tree planting record by ID
 * @param {number} id - The tree planting ID to delete
 */
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await db.execute("DELETE FROM trees WHERE id = ?", [id]);
        res.json({ message: "Tree planting deleted successfully" });
    } catch (error) {
        console.error("Error deleting tree planting:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;