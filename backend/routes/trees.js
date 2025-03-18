const express = require("express");
const { Tree } = require("../models");
const router = express.Router();

/**
 * Route to fetch all tree plantings from the database
 */
router.get("/", async (req, res) => {
    try {
        const trees = await Tree.findAll();
        res.json(trees);
    } catch (error) {
        console.error("Error fetching trees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Route to add a new tree planting
 */
router.post("/", async (req, res) => {
    try {
        const tree = await Tree.create(req.body);
        res.status(201).json(tree);
    } catch (error) {
        console.error("Error adding tree:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
