const nodemailer = require("nodemailer");

// ✅ Configure transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adventurous732@gmail.com", // ✅ Your Gmail
    pass: "liljigunxviaxqni", // ✅ Your App Password (16-character code)
  },
});

// ✅ Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: "asmita3847@gmail.com", // ✅ Sender email
      to, // ✅ Recipient email
      subject,
      text,
    });

    console.log("✅ Email sent successfully:", info.response);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;
