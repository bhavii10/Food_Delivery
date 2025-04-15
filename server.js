

//Asmita  ......
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("./email"); // ✅ Import email function

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

const usersFilePath = path.join(__dirname, "users.json");
const SECRET_KEY = "your_secret_key";

const readUsers = () => fs.existsSync(usersFilePath) ? JSON.parse(fs.readFileSync(usersFilePath)) : [];
const writeUsers = (users) => fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

// ✅ Create Account Route
app.post("/api/signup", async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email === "admin@example.com" ? "admin" : "user";
    users.push({ email, password: hashedPassword, role });
    writeUsers(users);

    res.status(201).json({ message: "Account created successfully." });
});

// ✅ Login Route
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(user => user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

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
        const response = await sendEmail(email, subject, message);
        res.status(response.success ? 200 : 500).json(response);
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// ✅ Import and Use Routes
const routes = ["orders", "foods", "favorites", "reviews", "coupon", "auth", "loyalty", "groupOrder"];
routes.forEach(route => {
    try {
        app.use(`/api/${route}`, require(`./routes/${route}`));
        console.log(`✅ Loaded Route: /api/${route}`);
    } catch (error) {
        console.error(`❌ Error loading /api/${route}:`, error.message);
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


































