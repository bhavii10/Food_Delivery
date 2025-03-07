const express = require("express");
const cors = require("cors");
const sendEmail = require("./email"); // ✅ Import email function

const app = express(); // ✅ Ensure a single app declaration

const path = require("path");

// ✅ Enable JSON and URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (like images, CSS, JS)
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Serve assets from public directly
app.use("/public", express.static(path.join(__dirname, "../frontend/public")));

// ✅ Email API Route
app.post("/api/send-email", async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const response = await sendEmail(email, subject, message);

    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// ✅ Import and use the orders route
const ordersRoute = require("./routes/orders");
app.use("/api/orders", ordersRoute);

// ✅ Add the missing update order route
app.post("/update-order", async (req, res) => {
  try {
    const { orderId, status } = req.body;
    console.log(`🔄 Updating order ${orderId} to status: ${status}`);

    // Here, update the order status in your database or memory
    res.status(200).json({ success: true, message: "Order updated successfully" });
  } catch (error) {
    console.error("❌ Error updating order:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

const foodsRoute = require("./routes/foods"); // Import the food routes
app.use("/api/foods", foodsRoute); // Use the route

// ✅ Whitelisting routes
const favoritesRoute = require("./routes/favorites"); // Import favorites route
app.use("/api", favoritesRoute); // Mount favorites route

// ✅ Reviews 
const reviewsRoute = require("./routes/reviews");
app.use("/api/reviews", reviewsRoute); // Fixed duplicate path for reviews

// ✅ Coupons
const couponRoute = require("./routes/coupon");
app.use("/api/coupons", couponRoute);

// ✅ JWT Authentication
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ✅ Single PORT Declaration
const PORT = 2000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

/* 
  ⚠️ Comments and extra sections kept intact as requested
*/

// const express = require("express");
// const cors = require("cors");
// const sendEmail = require("./email"); // ✅ Import the email function

// const app = express();
// app.use(cors());
// app.use(express.json()); // ✅ Enable JSON parsing

// // ✅ Email API Route
// app.post("/api/send-email", async (req, res) => {
//   try {
//     const { email, subject, message } = req.body; // ✅ Extract request data

//     if (!email || !subject || !message) {
//       return res.status(400).json({ success: false, error: "All fields are required" });
//     }

//     const response = await sendEmail(email, subject, message);
    
//     if (response.success) {
//       res.status(200).json(response);
//     } else {
//       res.status(500).json(response);
//     }
//   } catch (error) {
//     console.error("❌ Server Error:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });

// app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT"] }));
// app.use(express.json());

// // ✅ Import and use the orders route
// const ordersRoute = require("./routes/orders");
// app.use("/api/orders", ordersRoute);

// const PORT = 2100;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
