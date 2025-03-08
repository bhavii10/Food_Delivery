const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const walletFile = path.join(__dirname, 'wallet.json');

app.use(cors());
app.use(express.json());

// Function to read wallet data
const readWallet = () => {
    if (!fs.existsSync(walletFile)) return [];
    const data = fs.readFileSync(walletFile, 'utf8');
    return data.trim() ? JSON.parse(data) : [];
};

// Function to write wallet data
const writeWallet = (walletData) => {
    fs.writeFileSync(walletFile, JSON.stringify(walletData, null, 2));
};

// 📌 **Single Endpoint for Wallet Operations**
app.post('/api/wallet', (req, res) => {
    const { userId, action, amount } = req.body;

    if (!userId || !action || amount === undefined) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    let walletData = readWallet();
    let userWallet = walletData.find(user => user.userId === userId);

    if (!userWallet) {
        userWallet = { userId, balance: 0 };
        walletData.push(userWallet);
    }

    if (action === "add") {
        userWallet.balance += amount;
        message = `₹${amount} added to your wallet!`;
    } else if (action === "deduct") {
        if (userWallet.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        userWallet.balance -= amount;
        message = `₹${amount} deducted from your wallet!`;
    } else {
        return res.status(400).json({ message: "Invalid action" });
    }

    writeWallet(walletData);
    res.json({ message, balance: userWallet.balance });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});