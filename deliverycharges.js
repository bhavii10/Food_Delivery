const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const filePath = "deliveryCharge.json";

// Read delivery charge from file
const getDeliveryCharge = () => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    return { charge: 0 }; // Default if file doesn't exist
};

// **GET - Fetch Delivery Charge**
app.get("/delivery-charge", (req, res) => {
    res.json(getDeliveryCharge());
});

// **POST - Create Delivery Charge**
app.post("/delivery-charge", (req, res) => {
    const { charge } = req.body;
    if (typeof charge !== "number") {
        return res.status(400).json({ error: "Charge must be a number" });
    }

    fs.writeFileSync(filePath, JSON.stringify({ charge }, null, 2));
    res.json({ message: "Delivery charge added", charge });
});

// **PUT - Update Delivery Charge**
app.put("/delivery-charge", (req, res) => {
    const { charge } = req.body;
    if (typeof charge !== "number") {
        return res.status(400).json({ error: "Charge must be a number" });
    }

    fs.writeFileSync(filePath, JSON.stringify({ charge }, null, 2));
    res.json({ message: "Delivery charge updated", charge });
});

// **DELETE - Remove Delivery Charge**
app.delete("/delivery-charge", (req, res) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return res.json({ message: "Delivery charge deleted" });
    }
    res.status(404).json({ error: "No delivery charge found" });
});

// **Start the server**
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));