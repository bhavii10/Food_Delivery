// const express = require('express');
// const fs = require('fs');
// const path = require('path');

// const router = express.Router();
// const cartFile = path.join(__dirname, 'cart.json'); // Store cart items separately

// // ✅ Function to read cart data
// const readCart = () => {
//     if (!fs.existsSync(cartFile)) return [];
//     const data = fs.readFileSync(cartFile, 'utf8');
//     return data.trim() ? JSON.parse(data) : [];
// };

// // ✅ Function to write cart data
// const writeCart = (cart) => {
//     fs.writeFileSync(cartFile, JSON.stringify(cart, null, 2));
// };

// // ✅ 1️⃣ Get all cart items
// router.get('/cart', (req, res) => {
//     const cart = readCart();
//     res.json(cart);
// });

// // ✅ 2️⃣ Add an item to the cart
// router.post('/cart', (req, res) => {
//     const { id, name, price, quantity } = req.body;

//     if (!id || !name || !price || !quantity) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     let cart = readCart();
//     const existingItem = cart.find(item => item.id === id);

//     if (existingItem) {
//         existingItem.quantity += quantity;
//     } else {
//         cart.push({ id, name, price, quantity });
//     }

//     writeCart(cart);
//     res.status(201).json({ message: "Item added to cart", cart });
// });

// // ✅ 3️⃣ Update item quantity in cart
// router.put('/cart/:id', (req, res) => {
//     const { id } = req.params;
//     const { quantity } = req.body;

//     let cart = readCart();
//     const item = cart.find(item => String(item.id) === id);

//     if (!item) {
//         return res.status(404).json({ message: "Item not found in cart" });
//     }

//     item.quantity = quantity;
//     writeCart(cart);
//     res.json({ message: "Cart item updated", cart });
// });

// // ✅ 4️⃣ Remove an item from the cart
// router.delete('/cart/:id', (req, res) => {
//     const { id } = req.params;
//     let cart = readCart();

//     const newCart = cart.filter(item => String(item.id) !== id);
//     writeCart(newCart);

//     res.json({ message: "Item removed from cart", cart: newCart });
// });

// // ✅ 5️⃣ Clear cart after order placement (without modifying `orders.json`)
// router.delete('/cart', (req, res) => {
//     writeCart([]); // Empty the cart file
//     res.json({ message: "Cart cleared successfully" });
// });

// module.exports = router;
