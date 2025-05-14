// const express = require('express');
// const fs = require('fs');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const PORT = 5000;
// const ordersFile = path.join(__dirname, 'orders.json');
// const foodListFile = path.join(__dirname, 'food_list.json'); // File containing item details

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Function to read orders from file
// const readOrders = () => {
//     if (!fs.existsSync(ordersFile)) return [];
//     const data = fs.readFileSync(ordersFile, 'utf8');
//     return data.trim() ? JSON.parse(data) : [];
// };

// // Function to write orders to file
// const writeOrders = (orders) => {
//     fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
// };

// // Function to read food list (items)
// const readFoodList = () => {
//     if (!fs.existsSync(foodListFile)) return [];
//     const data = fs.readFileSync(foodListFile, 'utf8');
//     return data.trim() ? JSON.parse(data) : [];
// };

// // API route to place an order
// app.post('/api/orders', (req, res) => {
//     console.log("Received Order Request:", req.body); // Debugging incoming request

//     const { cartItems, totalAmount } = req.body;

//     if (!Array.isArray(cartItems) || cartItems.length === 0 || typeof totalAmount !== "number") {
//         return res.status(400).json({ message: "Invalid order data" });
//     }

//     const foodList = readFoodList();
//     console.log("Food List from File:", foodList); // Debugging food list content

//     // Convert cartItems to proper structure
//     const formattedCartItems = cartItems.map(cartItem => {
//         const item = foodList.find(food => String(food.id) === String(cartItem.id));

//         if (item) {
//             return {
//                 id: item.id,
//                 name: item.name,
//                 price: item.price,
//                 quantity: cartItem.quantity
//             };
//         } else {
//             console.warn(`Warning: No item found for ID ${cartItem.id}`);
//             return null; // Skip invalid items
//         }
//     }).filter(item => item !== null); // Remove null values

//     console.log("Formatted Cart Items:", formattedCartItems); // Debugging final cart item list

//     if (formattedCartItems.length === 0) {
//         return res.status(400).json({ message: "Invalid cart items, no matching products found" });
//     }

//     const orders = readOrders();
//     const newOrder = {
//         id: orders.length + 1,
//         cartItems: formattedCartItems, // Proper array format
//         totalAmount,
//         date: new Date().toISOString()
//     };

//     orders.push(newOrder);
//     writeOrders(orders);

//     res.status(201).json({ message: "Order placed successfully!", order: newOrder });
// });

// // API route to get all orders
// app.get('/api/orders', (req, res) => {
//     const orders = readOrders();
//     res.json(orders);
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5002;

const Order = require("./models/order1"); // Import MongoDB model
const foodListFile = path.join(__dirname, "food_list.json");

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb+srv://adventurous732:Txg349FwlShViMbO@cluster0.gkjvhjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
}).then(() => {
  console.log("✅ MongoDB connected for cart orders");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Read food list from local file
const readFoodList = () => {
  if (!fs.existsSync(foodListFile)) return [];
  const data = fs.readFileSync(foodListFile, "utf8");
  return data.trim() ? JSON.parse(data) : [];
};

// ✅ Place a new order
app.post("/api/orders", async (req, res) => {
  const { cartItems, totalAmount, userId } = req.body;

  if (!Array.isArray(cartItems) || cartItems.length === 0 || typeof totalAmount !== "number") {
    return res.status(400).json({ message: "Invalid order data" });
  }

  const foodList = readFoodList();

  const formattedCartItems = cartItems.map(cartItem => {
    const item = foodList.find(food => String(food.id) === String(cartItem.id));

    if (item && typeof cartItem.quantity === "number" && cartItem.quantity > 0) {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: cartItem.quantity
      };
    } else {
      return null;
    }
  }).filter(item => item !== null);

  if (formattedCartItems.length === 0) {
    return res.status(400).json({ message: "No valid items in cart" });
  }

  try {
    const newOrder = new Order({
      cartItems: formattedCartItems,
      totalAmount,
      userId
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error("❌ Error saving order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Cart Order Server running on http://localhost:${PORT}`);
});