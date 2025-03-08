const express = require("express");
const router = express.Router();

let orders = []; // ✅ Store orders in memory

// ✅ Get All Orders
router.get("/", (req, res) => {
  res.json(orders);
});

// ✅ Create Order
router.post("/", (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    items: req.body.items,
    status: "pending",
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// ✅ Update Order Status
router.put("/:id", (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = req.body.status;
  res.json(order);
});

// ✅ Delete Order
router.delete("/:id", (req, res) => {
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Order not found" });

  orders.splice(index, 1);
  res.json({ message: "Order deleted" });
});

module.exports = router;
