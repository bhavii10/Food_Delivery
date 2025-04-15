const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Menu items database
const menu = [
  { name: "burger", price: 150 },
  { name: "pizza", price: 250 },
  { name: "pasta", "price": 180 },
  { "name": "fries", price: 100 },
  { name: "coke", price: 50 },
  { name: "noodles", price: 120 }
];

// API to process voice orders
app.post("/process-order", (req, res) => {
  const { orderText } = req.body;
  if (!orderText) {
    return res.json({ success: false, message: "Please speak your order." });
  }

  const lowerText = orderText.toLowerCase();
  const orderedItems = menu.filter((item) => orderText.includes(item.name));

  if (orderItems.length === 0) {
    return res.json({ success: false, message: "No matching food items found in your order." });
  }

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

  res.json({
    success: true,
    message: "Order added successfully!",
    items: orderItems.map(item => item.name),
    totalAmount,
  });
});

app.use(cors());
app.use(express.json());

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
