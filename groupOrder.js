const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const groups = {}; // In-memory storage for groups

// Create a new group
router.post("/create", (req, res) => {
    const groupId = uuidv4();
    groups[groupId] = { items: [] };
    res.json({ success: true, groupId });
});

// Add item to a group
router.post("/add/:groupId", (req, res) => {
    const { groupId } = req.params;
    const { name, price } = req.body;

    if (!groups[groupId]) {
        return res.status(404).json({ success: false, message: "Group not found" });
    }

    if (!name || !price) {
        return res.status(400).json({ success: false, message: "Item name and price are required" });
    }

    groups[groupId].items.push({ name, price });
    res.json({ success: true, items: groups[groupId].items });
});

// Get cart for a group
router.get("/cart/:groupId", (req, res) => {
    const { groupId } = req.params;

    if (!groups[groupId]) {
        return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.json({ success: true, cart: groups[groupId].items });
});

// 🔁 Redirect group link to home page
router.get("/:groupId", (req, res) => {
    res.redirect("http://localhost:3000/");
});

module.exports = router;