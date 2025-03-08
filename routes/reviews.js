const express = require("express");
const router = express.Router();

// In-memory store for reviews
let reviews = [];  

// ✅ POST: Add a review
router.post("/:foodId/reviews", (req, res) => {
  const { user, rating, comment } = req.body;
  const foodId = req.params.foodId;

  if (!user || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newReview = {
    id: reviews.length + 1,
    foodId,
    user,
    rating,
    comment,
    createdAt: new Date(),
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

// ✅ GET: Fetch all reviews for a food item
router.get("/:foodId/reviews", (req, res) => {
  const foodId = req.params.foodId;
  const foodReviews = reviews.filter((review) => review.foodId === foodId);
  res.json(foodReviews);
});

// ✅ DELETE: Remove a review (Admin only)
router.delete("/:foodId/reviews/:reviewId", (req, res) => {
  const { foodId, reviewId } = req.params;
  const index = reviews.findIndex((review) => review.id == reviewId && review.foodId == foodId);

  if (index === -1) {
    return res.status(404).json({ message: "Review not found" });
  }

  reviews.splice(index, 1);
  res.json({ message: "Review deleted" });
});

module.exports = router;
