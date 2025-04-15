const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Order Management Routes (Admin Panel Integration)
// Example: Fetch, Update, Delete orders
app.get("/orders", (req, res) => {
  res.json({ message: "Order management route" });
});

// ✅ Create Order (Payment)
app.post("/create-order", async (req, res) => {
  console.log("🟢 /create-order route hit!");  // Add this log

  try {
    const options = {
      amount: Math.round(req.body.amount), // ✅ CORRECT (already in paisa from frontend)
 // Amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Verify Payment
app.post("/verify-payment", async (req, res) => {
  console.log("✅ Received Payment Verification Data:", req.body);

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: "Missing payment details" });
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  console.log("🔹 Expected Signature:", expectedSignature);
  console.log("🔹 Received Signature:", razorpay_signature);

  if (expectedSignature === razorpay_signature) {
    return res.json({ success: true, message: "Payment verified successfully" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid payment signature" });
  }
});

console.log("🔹 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("🔹 RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
// const cors = require("cors");
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));


const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
