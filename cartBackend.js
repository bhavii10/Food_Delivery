const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5002;
const ordersFile = path.join(__dirname, 'orders.json');
const foodListFile = path.join(__dirname, 'food_list.json'); // File containing item details

// Middleware
app.use(cors());
app.use(express.json());

// Function to read orders from file
const readOrders = () => {
    if (!fs.existsSync(ordersFile)) return [];
    const data = fs.readFileSync(ordersFile, 'utf8');
    return data.trim() ? JSON.parse(data) : [];
};

// Function to write orders to file
const writeOrders = (orders) => {
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
};

// Function to read food list (items)
const readFoodList = () => {
    if (!fs.existsSync(foodListFile)) return [];
    const data = fs.readFileSync(foodListFile, 'utf8');
    return data.trim() ? JSON.parse(data) : [];
};

// API route to place an order
app.post('/api/orders', (req, res) => {
    console.log("Received Order Request:", req.body); // Debugging incoming request

    const { cartItems, totalAmount } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0 || typeof totalAmount !== "number") {
        return res.status(400).json({ message: "Invalid order data" });
    }

    const foodList = readFoodList();
    console.log("Food List from File:", foodList); // Debugging food list content

    // Convert cartItems to proper structure
    const formattedCartItems = cartItems.map(cartItem => {
        const item = foodList.find(food => String(food.id) === String(cartItem.id));

        if (item) {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: cartItem.quantity
            };
        } else {
            console.warn(`Warning: No item found for ID ${cartItem.id}`);
            return null; // Skip invalid items
        }
    }).filter(item => item !== null); // Remove null values

    console.log("Formatted Cart Items:", formattedCartItems); // Debugging final cart item list

    if (formattedCartItems.length === 0) {
        return res.status(400).json({ message: "Invalid cart items, no matching products found" });
    }

    const orders = readOrders();
    const newOrder = {
        id: orders.length + 1,
        cartItems: formattedCartItems, // Proper array format
        totalAmount,
        date: new Date().toISOString()
    };

    orders.push(newOrder);
    writeOrders(orders);

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
});

// API route to get all orders
app.get('/api/orders', (req, res) => {
    const orders = readOrders();
    res.json(orders);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
