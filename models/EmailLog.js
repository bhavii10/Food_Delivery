const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema({
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
});

const EmailLog = mongoose.model("EmailLog", emailLogSchema);

module.exports = EmailLog;
