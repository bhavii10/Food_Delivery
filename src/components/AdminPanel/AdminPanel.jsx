import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Orders from "./Orders"; 
import "./AdminPanel.css";

const AdminPanel = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2100/api/orders", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  }, [token]);

  const updateOrderStatus = (id, status) => {
    fetch(`http://localhost:2100/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    }).then(() => {
      setOrders(orders.map(o => (o.id === id ? { ...o, status } : o)));
    });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <Orders />
      {orders.map(order => (
        <div key={order.id}>
          <p>Order #{order.id} - Status: {order.status}</p>
          <button onClick={() => updateOrderStatus(order.id, "delivered")}>Mark as Delivered</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;

























// import React, { useEffect, useState } from "react";

// const AdminPanel = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:2500/api/orders")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Orders:", data); // Debugging
//         if (Array.isArray(data)) {
//           setOrders(data);
//         } else {
//           console.error("Unexpected API response:", data);
//         }
//       })
//       .catch((error) => console.error("Error fetching orders:", error));
//   }, []);

//   return (
//     <div>
//       <h2>Admin Panel - Orders</h2>
//       <ul>
//         {orders.length > 0 ? (
//           orders.map((order) => (
//             <li key={order.id}>{order.status} - {order.items.join(", ")}</li>
//           ))
//         ) : (
//           <p>No orders found.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default AdminPanel;
