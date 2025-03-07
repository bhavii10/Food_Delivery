const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5001;
const ordersFile = path.join(__dirname, 'deliveryOrders.json');
const foodListFile = path.join(__dirname, 'food_list.json');

// Middleware
app.use(cors());
app.use(express.json());

// Function to read a JSON file
const readJSONFile = (filePath) => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf8');
    return data.trim() ? JSON.parse(data) : [];
};

// Function to write JSON data to a file
const writeJSONFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// API to place an order
app.post('/api/place-order', (req, res) => {
    console.log("📥 Received Order Request:", req.body);

    const { firstName, lastName, email, street, city, state, pinCode, country, phone, cartItems, totalAmount } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !street || !city || !state || !pinCode || !country || !phone || !cartItems || Object.keys(cartItems).length === 0) {
        console.log("❌ Missing required fields!");
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Read food_list.json to get item details
    const foodList = readJSONFile(foodListFile);

    // Convert cartItems (IDs) to item names with quantities
    const formattedCartItems = Object.keys(cartItems).map(id => {
        const item = foodList.find(food => String(food.id) === id);
        return item ? { name: item.name, quantity: cartItems[id], price: item.price } : null;
    }).filter(Boolean); // Remove null values if ID doesn't exist

    if (formattedCartItems.length === 0) {
        console.log("❌ No valid items found for IDs:", Object.keys(cartItems));
        return res.status(400).json({ success: false, message: "Invalid cart items" });
    }

    // Read existing orders
    let orders = readJSONFile(ordersFile);

    // Create a new order object
    const newOrder = {
        id: orders.length + 1,
        firstName,
        lastName,
        email,
        street,
        city,
        state,
        pinCode,
        country,
        phone,
        cartItems: formattedCartItems,
        totalAmount,
        date: new Date().toISOString(),
        status: "Processing"
    };

    // Save the order
    orders.push(newOrder);
    writeJSONFile(ordersFile, orders);

    console.log("✅ Order placed successfully:", newOrder);
    res.json({ success: true, message: "Order placed successfully!", order: newOrder });
});

// API to get all orders
app.get('/api/orders', (req, res) => {
    const orders = readJSONFile(ordersFile);
    res.json(orders);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
