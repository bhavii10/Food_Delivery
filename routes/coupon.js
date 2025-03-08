const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const couponsFile = path.join(__dirname, "../data/coupons.json");

// ✅ Function to Read Coupons from JSON
const readCoupons = () => {
  if (!fs.existsSync(couponsFile)) return [];
  return JSON.parse(fs.readFileSync(couponsFile, "utf8"));
};

// ✅ Function to Write Coupons to JSON
const writeCoupons = (coupons) => {
  fs.writeFileSync(couponsFile, JSON.stringify(coupons, null, 2), "utf8");
};

// ✅ POST: Admin Creates a New Coupon
router.post("/", (req, res) => {
  const { code, discount, expiresAt } = req.body;
  
  if (!code || !discount || !expiresAt) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const coupons = readCoupons();
  if (coupons.some(c => c.code === code)) {
    return res.status(400).json({ message: "Coupon code already exists" });
  }

  const newCoupon = { code, discount, expiresAt, used: false };
  coupons.push(newCoupon);
  writeCoupons(coupons);

  res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
});

// ✅ GET: Fetch All Available Coupons
router.get("/", (req, res) => {
  const coupons = readCoupons();
  res.json(coupons);
});

// ✅ POST: Apply Coupon Code
router.post("/apply", (req, res) => {
  const { code, totalAmount } = req.body;
  
  if (!code || !totalAmount) {
    return res.status(400).json({ message: "Coupon code and total amount required" });
  }

  const coupons = readCoupons();
  const coupon = coupons.find(c => c.code === code);

  if (!coupon) {
    return res.status(404).json({ message: "Invalid coupon code" });
  }

  // Check expiration
  if (new Date(coupon.expiresAt) < new Date()) {
    return res.status(400).json({ message: "Coupon has expired" });
  }

  // Apply discount
  const discountAmount = (totalAmount * coupon.discount) / 100;
  const newTotal = totalAmount - discountAmount;

  res.json({
    message: "Coupon applied successfully",
    discountAmount,
    newTotal,
  });
});

module.exports = router;
