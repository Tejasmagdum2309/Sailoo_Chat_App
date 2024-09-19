import express from "express";
import http from "http";
import { Server } from "socket.io"; // Import Socket.IO
import { app } from "./app.js";
import connectDB from "./src/db/index.js";
import dotenv from "dotenv";
import Room from "./src/model/room.model.js";

dotenv.config();

const port = process.env.PORT || 3001;

// Create the HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","https://sailoo-chat-app.onrender.com"], // Add your production frontend domain here
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (if needed for auth)
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the database before starting the server
const startServer = async () => {
  try {
    await connectDB(); // Ensure database is connected first
    console.log("Database connected successfully");

    // Start the server after DB connection
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });

    // Socket.IO connection event
    io.on("connection", (socket) => {
      console.log("a user connected:", socket.id);

      // Join room
      socket.on("joinRoom", (roomid) => {
        socket.join(roomid);
        console.log(`User ${socket.id} joined room: ${roomid}`);

        // Automatically delete room after 1 minute
        setTimeout(async () => {
          // Emit roomDeleted event to all users in the room
          console.log(`Deleting room: ${roomid}`);
          const res = await Room.findOneAndDelete({roomid});
          console.log(res);
          io.to(roomid).emit("roomDeleted", { roomid });

          // Optionally: Clean up room data from the database here if needed
          console.log(`Room ${roomid} deleted.`);

          // Remove all users from the room (optional)
          socket.leave(roomid);
        }, 60 * 1000); // 1 minute in milliseconds
      });

      // Send message to a specific room
      socket.on("sendMessageToRoom", ({ room, message, name }) => {
        console.log(`Message sent to room ${room}: ${message} by ${name}`);
        io.to(room).emit("message", message , name); // Broadcast message to the room
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};

startServer();
