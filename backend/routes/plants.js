const express = require("express");
const { Plant } = require("../models");
const router = express.Router();

/**
 * Route to fetch all plants from the database
 */
router.get("/", async (req, res) => {
    try {
        const plants = await Plant.findAll();
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
    try {
        const plant = await Plant.create(req.body);
        res.status(201).json(plant);
    } catch (error) {
        console.error("Error adding plant:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
