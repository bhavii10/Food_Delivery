const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// ✅ Configure Transporter (Use Correct Gmail & App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adventurous732@gmail.com", // ✅ Your Gmail
    pass: "liljigunxviaxqni", // ✅ Your 16-character App Password
  },
});

// ✅ API Route to Send Email
router.post("/send-email", async (req, res) => {
  try {
    console.log("📩 Incoming request:", req.body);

    // ✅ Extract email data from request
    const { email, subject, message } = req.body;

    // ✅ Check if all fields are provided
    if (!email || !subject || !message) {
      console.log("❌ Error: Missing Fields");
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    // ✅ Send the Email
    const info = await transporter.sendMail({
      from: "asmita3847@gmail.com",
      to: email, // ✅ Send email to provided address
      subject,
      text: message,
    });

    console.log("✅ Email Sent Successfully:", info.response);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ ERROR SENDING EMAIL:", error);
    res.status(500).json({ success: false, error: "Failed to send email", details: error.message });
  }
});

module.exports = router;
