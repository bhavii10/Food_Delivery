import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./GroupOrderPage.css";

function GroupOrderPage() {
  const { groupId } = useParams();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/groupOrder/cart/${groupId}`);
      if (res.data.success) {
        setItems(res.data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addItem = async () => {
    if (!newItem.name || !newItem.price) return alert("Fill item details");

    try {
      const res = await axios.post("http://localhost:5000/api/groupOrder/add-item", {
        groupId,
        item: newItem,
      });
      if (res.data.success) {
        fetchCart();
        setNewItem({ name: "", price: "" });
      }
    } catch (err) {
      alert("Error adding item");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [groupId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Group ID: {groupId}</h2>
      <h3>Add Item</h3>
      <input
        type="text"
        placeholder="Item name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) })}
      />
      <button onClick={addItem}>Add to Cart</button>

      <h3>Group Cart Items:</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item.name} - Rs {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupOrderPage;