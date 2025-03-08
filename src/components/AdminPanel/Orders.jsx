import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch Orders from Backend
  useEffect(() => {
    fetch("http://localhost:2100/api/orders")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Orders:", data); // Debugging response
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // ✅ Update Order Status
  const updateStatus = (id, newStatus) => {
    fetch(`http://localhost:2100/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((updatedOrder) => {
        console.log("Updated Order:", updatedOrder);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => console.error("Error updating order:", error));
  };
  

  return (
    <div>
      <h2>Admin Panel - Orders</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            {/* <th>Items</th> */}
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              order.id ? ( // ✅ Only render if `id` exists
                <tr key={order.id.toString()}>
                  <td>{order.id}</td>
                  {/* <td>{order.items ? order.items.join(", ") : "No items"}</td> */}
                  <td>{order.status}</td>
                  <td>
                    {order.status !== "delivered" && (
                      <>
                        <button onClick={() => updateStatus(order.id, "accepted")}>
                          Accept
                        </button>
                        <button onClick={() => updateStatus(order.id, "preparing")}>
                          Preparing
                        </button>
                        <button onClick={() => updateStatus(order.id, "delivered")}>
                          Deliver
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ) : null
            ))
          ) : (
            <tr>
              <td colSpan="4">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
