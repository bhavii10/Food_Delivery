// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);

// // ✅ Apply CORS properly
// app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));
// app.use(express.json());

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"]
//   }
// });

// io.on("connection", (socket) => {
//   console.log("🟢 New client connected:", socket.id);

//   socket.on("orderUpdate", (data) => {
//     console.log("📢 Order update received:", data);
//     io.emit("orderUpdate", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 Client disconnected:", socket.id);
//   });
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`🚀 Tracking server running on port ${PORT}`);
// });


































































































































































const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // ✅ React Frontend
        methods: ["GET", "POST"],
    },
});

// ✅ Enable CORS & JSON Parsing
app.use(cors());
app.use(express.json());

// ✅ Store Delivery Boy Locations
const deliveryBoyLocations = {};

// ✅ Handle WebSocket Connections
io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);

    // ✅ Listen for Delivery Boy's Location
    socket.on("sendLocation", (data) => {
        if (!data || !data.orderId || !data.lat || !data.lng) {
            console.error("❌ Invalid location data received:", data);
            return;
        }

        console.log("📡 Received Location Data from Delivery Boy:", data);

        // 🛰️ Save Delivery Boy Location
        deliveryBoyLocations[data.orderId] = { lat: data.lat, lng: data.lng };

        // 🛰️ Emit Location Update to All Clients
        io.emit("updateLocation", data);
    });

    socket.on("disconnect", () => {
        console.log("❌ User Disconnected:", socket.id);
    });
});

// ✅ Start Server
const PORT = 2200;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
