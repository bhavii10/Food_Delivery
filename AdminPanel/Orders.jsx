// import React, { useEffect, useState } from "react";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   // ✅ Fetch Orders from Backend
//   useEffect(() => {
//     fetch("http://localhost:2100/api/orders")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Orders:", data); // Debugging response
//         if (Array.isArray(data)) {
//           setOrders(data);
//         } else {
//           console.error("Unexpected API response format:", data);
//         }
//       })
//       .catch((error) => console.error("Error fetching orders:", error));
//   }, []);

//   // ✅ Update Order Status
//   const updateStatus = (id, newStatus) => {
//     fetch(`http://localhost:2100/api/orders/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status: newStatus }),
//     })
//       .then((res) => res.json())
//       .then((updatedOrder) => {
//         console.log("Updated Order:", updatedOrder);
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order.id === id ? { ...order, status: newStatus } : order
//           )
//         );
//       })
//       .catch((error) => console.error("Error updating order:", error));
//   };
  

//   return (
//     <div>
//       <h2>Admin Panel - Orders</h2>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             {/* <th>Items</th> */}
//             <th>Status</th>
//             <th>Update Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               order.id ? ( // ✅ Only render if `id` exists
//                 <tr key={order.id.toString()}>
//                   <td>{order.id}</td>
//                   {/* <td>{order.items ? order.items.join(", ") : "No items"}</td> */}
//                   <td>{order.status}</td>
//                   <td>
//                     {order.status !== "delivered" && (
//                       <>
//                         <button onClick={() => updateStatus(order.id, "accepted")}>
//                           Accept
//                         </button>
//                         <button onClick={() => updateStatus(order.id, "preparing")}>
//                           Preparing
//                         </button>
//                         <button onClick={() => updateStatus(order.id, "delivered")}>
//                           Deliver
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ) : null
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No orders found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Orders;





























// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:2100"); // Connect to WebSocket server

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   // ✅ Fetch Orders from Backend
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch("http://localhost:2100/api/orders");
//         const data = await response.json();
//         console.log("Fetched Orders:", data); // Debugging response

//         if (Array.isArray(data)) {
//           setOrders(data);
//         } else {
//           console.error("Unexpected API response format:", data);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching orders:", error);
//       }
//     };

//     fetchOrders();

//     // ✅ Listen for real-time order updates
//     socket.on("orderUpdate", (updatedOrder) => {
//       console.log("📢 Order update received:", updatedOrder);
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === updatedOrder.id ? { ...order, status: updatedOrder.status } : order
//         )
//       );
//     });

//     return () => {
//       socket.off("orderUpdate"); // Clean up listener on unmount
//     };
//   }, []);

//   // ✅ Update Order Status & Emit WebSocket Event
//   const updateStatus = async (id, newStatus) => {
//     try {
//       const response = await fetch(`http://localhost:2100/api/orders/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) throw new Error("Failed to update order");

//       const updatedOrder = await response.json();
//       console.log("Updated Order:", updatedOrder);

//       // ✅ Emit order update event
//       socket.emit("orderUpdate", updatedOrder);

//       // ✅ Update UI state immediately
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === id ? { ...order, status: newStatus } : order
//         )
//       );
//     } catch (error) {
//       console.error("❌ Error updating order:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Panel - Orders</h2>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Status</th>
//             <th>Update Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) =>
//               order.id ? (
//                 <tr key={order.id.toString()}>
//                   <td>{order.id}</td>
//                   <td>{order.status}</td>
//                   <td>
//                     {order.status !== "delivered" && (
//                       <>
//                         <button onClick={() => updateStatus(order.id, "accepted")}>
//                           Accept
//                         </button>
//                         <button onClick={() => updateStatus(order.id, "preparing")}>
//                           Preparing
//                         </button>
//                         <button onClick={() => updateStatus(order.id, "delivered")}>
//                           Deliver
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ) : null
//             )
//           ) : (
//             <tr>
//               <td colSpan="3">No orders found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Orders;

































































//deliveryboy.js and eska port should be same 
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:2100"); // Connect to WebSocket server

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState(["Rahul", "Aman", "Vikram", "Suresh"]);
  const [assignedBoys, setAssignedBoys] = useState({});

  // ✅ Fetch Orders from Backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:2100/api/orders");
        const data = await response.json();
        console.log("Fetched Orders:", data);

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      }
    };

    fetchOrders();

    socket.on("orderUpdate", (updatedOrder) => {
      console.log("📢 Order update received:", updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? { ...order, status: updatedOrder.status } : order
        )
      );
    });

    return () => {
      socket.off("orderUpdate");
    };
  }, []);

  // ✅ Update Order Status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:2100/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update order");

      const updatedOrder = await response.json();
      console.log("Updated Order:", updatedOrder);

      socket.emit("orderUpdate", updatedOrder);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("❌ Error updating order:", error);
    }
  };

  // ✅ Assign Delivery Boy
  const assignDeliveryBoy = (orderId, boyName) => {
    setAssignedBoys((prev) => ({ ...prev, [orderId]: boyName }));
  };

  return (
    <div>
      <h2>Admin Panel - Orders</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) =>
              order.id ? (
                <tr key={order.id.toString()}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>
                    {order.status !== "delivered" && (
                      <>
                        <button onClick={() => updateStatus(order.id, "accepted")}>Accept</button>
                        <button onClick={() => updateStatus(order.id, "preparing")}>Preparing</button>
                        <button onClick={() => updateStatus(order.id, "delivered")}>Deliver</button>
                      </>
                    )}
                  </td>
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <td colSpan="3">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delivery Boy Assignment Section */}
      {/* <h2>Assign Delivery Boys</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Assign Delivery Boy</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                <select
                  onChange={(e) => assignDeliveryBoy(order.id, e.target.value)}
                  value={assignedBoys[order.id] || ""}
                >
                  <option value="">Select Delivery Boy</option>
                  {deliveryBoys.map((boy) => (
                    <option key={boy} value={boy}>{boy}</option>
                  ))}
                </select>
                {assignedBoys[order.id] && <span> ✅ Assigned to {assignedBoys[order.id]}</span>}
              </td>
            </tr>
          ))} */}
        {/* </tbody> */}
      {/* </table> */}
    </div>
  );
};

export default Orders;
