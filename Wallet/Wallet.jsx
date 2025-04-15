import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../components/Wallet/Wallet.css";

const Wallet = () => {
  const userId = "user123"; // Example user ID
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  // Fetch balance when the component loads
  useEffect(() => {
    fetchBalance();
  }, []);

  // Fetch wallet balance from the backend
  const fetchBalance = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/wallet", {
        userId,
        action: "check",
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Handle transactions (Add or Deduct)
  const handleTransaction = async (action) => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid amount!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/wallet", {
        userId,
        action,
        amount: parseFloat(amount),
      });

      setMessage(response.data.message);
      setBalance(response.data.balance); // ✅ Update balance immediately!
    } catch (error) {
      setMessage(error.response?.data?.message || "Transaction failed!");
    }
  };

  return (
    <div className="wallet-container">
      <h2>My Wallet</h2>
      <p>Current Balance: ₹{balance}</p>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="wallet-buttons">
        <button onClick={() => handleTransaction("add")}>Add Money</button>
        <button onClick={() => handleTransaction("deduct")}>Deduct Money</button>
      </div>

      {message && <p className="wallet-message">{message}</p>}
    </div>
  );
};

export default Wallet;