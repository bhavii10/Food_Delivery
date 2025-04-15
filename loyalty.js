const express = require("express");
const fs = require("fs");
const router = express.Router();

const filePath = "./loyaltyPoints.json";

// Function to load loyalty points from JSON file
const loadPoints = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ users: {} }, null, 2));
  }
  return JSON.parse(fs.readFileSync(filePath));
};

// Function to save loyalty points to JSON file
const savePoints = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// ⭐ GET: Fetch Loyalty Points for Specific User
router.get("/:email", (req, res) => {
  try {
    const email = req.params.email;
    let data = loadPoints();
    const totalPoints = data.users[email] || 0;

    res.status(200).json({
      success: true,
      email,
      totalPoints
    });

  } catch (error) {
    console.error("❌ Error fetching loyalty points:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ⭐ POST: Earn Loyalty Points
router.post("/earn", (req, res) => {
  try {
    const { email, totalAmount } = req.body;

    if (!email || !totalAmount) {
      return res.status(400).json({ success: false, message: "Email and totalAmount are required" });
    }

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      return res.status(400).json({ success: false, message: "totalAmount must be a positive number" });
    }

    let data = loadPoints();

    if (!data.users[email]) {
      data.users[email] = 0;
    }

    const pointsEarned = Math.floor(totalAmount / 10);
    data.users[email] += pointsEarned;

    savePoints(data);

    res.status(200).json({
      success: true,
      message: "Loyalty points added successfully!",
      email,
      pointsEarned,
      totalPoints: data.users[email]
    });

  } catch (error) {
    console.error("❌ Error earning loyalty points:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ⭐ POST: Redeem Loyalty Points
router.post("/redeem", (req, res) => {
  try {
    const { email, pointsToRedeem } = req.body;

    if (!email || !pointsToRedeem) {
      return res.status(400).json({ success: false, message: "Email and pointsToRedeem are required" });
    }

    let data = loadPoints();
    const availablePoints = data.users[email] || 0;

    if (availablePoints < pointsToRedeem) {
      return res.status(400).json({ success: false, message: "Not enough points to redeem" });
    }

    data.users[email] -= pointsToRedeem;
    savePoints(data);

    res.status(200).json({
      success: true,
      message: `Successfully redeemed ${pointsToRedeem} points`,
      email,
      pointsDeducted: pointsToRedeem,
      remainingPoints: data.users[email]
    });

  } catch (error) {
    console.error("❌ Error redeeming loyalty points:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ⭐ PUT: Update Loyalty Points for a User
router.put("/update", (req, res) => {
  try {
    const { email, newPoints } = req.body;

    if (!email || newPoints === undefined) {
      return res.status(400).json({ success: false, message: "Email and newPoints are required" });
    }

    let data = loadPoints();
    data.users[email] = newPoints;

    savePoints(data);

    res.status(200).json({
      success: true,
      message: "Loyalty points updated successfully!",
      email,
      totalPoints: data.users[email]
    });

  } catch (error) {
    console.error("❌ Error updating loyalty points:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ⭐ DELETE: Remove Loyalty Points for a User
router.delete("/delete/:email", (req, res) => {
  try {
    const email = req.params.email;
    let data = loadPoints();

    if (!data.users[email]) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    delete data.users[email];
    savePoints(data);

    res.status(200).json({
      success: true,
      message: "Loyalty points deleted successfully!",
      email
    });

  } catch (error) {
    console.error("❌ Error deleting loyalty points:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;