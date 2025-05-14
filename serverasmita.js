const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const sendEmail = require("./email"); // ✅ Import email function
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ CORS Configuration
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// ✅ Serve Static Files
const publicPath = path.join(__dirname, "../frontend/public");
app.use(express.static(publicPath));
app.use("/public", express.static(publicPath));

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://adventurous732:Txg349FwlShViMbO@cluster0.gkjvhjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ MongoDB Models
const User = require("./models/User");  // We'll create the User model below
const EmailLog = require("./models/EmailLog"); // EmailLog Model

// Secret key for JWT
const SECRET_KEY = "your_secret_key";

// ✅ Create Account Route (Signup)
app.post("/api/signup", async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "Email already exists." });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email === "admin@example.com" ? "admin" : "user";

    // Create a new user
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "Account created successfully." });
});

// ✅ Login Route
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful.", token, role: user.role });
});

// ✅ Email API Route
app.post("/api/send-email", async (req, res) => {
    try {
        const { email, subject, message } = req.body;
        if (!email || !subject || !message) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        // Send email using Nodemailer
        const response = await sendEmail(email, subject, message);

        // Log the email details to MongoDB
        const emailLog = new EmailLog({ email, subject, message });
        await emailLog.save();

        res.status(response.success ? 200 : 500).json(response);
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// ✅ Add Item to Cart Route
app.post("/api/add-to-cart", async (req, res) => {
    const { userId, itemId, quantity, price } = req.body;

    // Validate input
    if (!userId || !itemId || !quantity || !price) {
        return res.status(400).json({ error: "UserId, itemId, quantity, and price are required." });
    }

    try {
        // Find the user by userId
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Convert itemId to ObjectId (in case it's passed as a string)
        const itemObjectId = mongoose.Types.ObjectId(itemId);

        // Check if item already exists in the cart
        const existingItemIndex = user.cart.findIndex(item => item.itemId.toString() === itemObjectId.toString());

        if (existingItemIndex >= 0) {
            // Update quantity if the item already exists in the cart
            user.cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to the cart if it doesn't exist already
            user.cart.push({ itemId: itemObjectId, quantity, price });
        }

        // Log the updated user to see the cart changes
        console.log("User before saving:", user);

        // Save the updated user document
        await user.save();

        // Log the user after saving to confirm that the cart is updated
        console.log("User after saving:", user);

        // Respond with the updated cart
        res.status(200).json({ message: "Item added to cart successfully.", cart: user.cart });
    } catch (error) {
        console.error("❌ Error adding item to cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// ✅ Order Update API
app.post("/api/update-order", async (req, res) => {
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, error: "Order ID and status are required" });
        }
        console.log(`🔄 Updating order ${orderId} to status: ${status}`);
        res.status(200).json({ success: true, message: "Order updated successfully" });
    } catch (error) {
        console.error("❌ Error updating order:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// ✅ Default Route for Undefined Endpoints
app.use((req, res) => {
    res.status(404).json({ success: false, error: "Route not found" });
});

// ✅ Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
