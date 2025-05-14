const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  quantity: Number
});

const orderSchema = new mongoose.Schema({
  cartItems: [cartItemSchema],
  totalAmount: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

const order1 = mongoose.model("order1", orderSchema);
module.exports = order1;