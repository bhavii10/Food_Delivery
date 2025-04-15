// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import Orders from "./Orders"; 

// const AdminPanel = () => {
//   const { token } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:2100/api/orders", {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(data => setOrders(data))
//       .catch(err => console.error("Error fetching orders:", err));
//   }, [token]);

//   const updateOrderStatus = (id, status) => {
//     fetch(`http://localhost:2100/api/orders/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ status })
//     }).then(() => {
//       setOrders(orders.map(o => (o.id === id ? { ...o, status } : o)));
//     });
//   };

//   return (
//     <div>
//       <h2>Admin Panel</h2>
//       <Orders />
//       {orders.map(order => (
//         <div key={order.id}>
//           <p>Order #{order.id} - Status: {order.status}</p>
//           <button onClick={() => updateOrderStatus(order.id, "delivered")}>Mark as Delivered</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminPanel;









import React from "react";
import Orders from "./Orders";
import "./AdminPanel.css";

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h2></h2>
      <Orders />
    </div>
  );
};

export default AdminPanel;











































