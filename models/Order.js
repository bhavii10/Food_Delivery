const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  status: { type: String, default: "pending" },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

module.exports = mongoose.model("Order", orderSchema);
