const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Ensure JSON body parsing

// In-memory order storage
let orders = [];

// ✅ Get all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// ✅ Add a new order (Auto-increment ID)
app.post("/api/orders", (req, res) => {
  const newOrder = {
    id: orders.length + 1, // Assigns an ID
    status: "pending",
  };
  orders.push(newOrder);
  res.json(newOrder);
});

// ✅ Update order status
app.put("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find((o) => o.id == id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  order.status = status; // Update status
  res.json(order);
});

// ✅ Start server
const PORT = 2100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
