const express = require("express");
const router = express.Router();

let favorites = []; // Temporary in-memory storage for favorites

// ✅ Add food item to favorites
router.post("/users/:userId/favorites/:foodId", (req, res) => {
  const { userId, foodId } = req.params;

  // Check if the item is already in favorites
  const existingFavorite = favorites.find(fav => fav.userId === userId && fav.foodId === foodId);
  if (existingFavorite) {
    return res.status(400).json({ message: "Food item is already in favorites!" });
  }

  // Add to favorites
  favorites.push({ userId, foodId });
  res.json({ message: "Added to favorites", favorites });
});

// ✅ Get favorite food items of a user
router.get("/users/:userId/favorites", (req, res) => {
  const userFavorites = favorites.filter(fav => fav.userId === req.params.userId);
  res.json(userFavorites);
});

// ✅ Remove food item from favorites
router.delete("/users/:userId/favorites/:foodId", (req, res) => {
  const { userId, foodId } = req.params;

  // Check if the food exists in favorites
  const index = favorites.findIndex(fav => fav.userId === userId && fav.foodId === foodId);
  if (index === -1) {
    return res.status(404).json({ message: "Food item not found in favorites!" });
  }

  // Remove from favorites
  favorites.splice(index, 1);
  res.json({ message: "Removed from favorites", favorites });
});

module.exports = router;
