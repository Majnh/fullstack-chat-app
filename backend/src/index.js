import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";
import { log } from "console";

dotenv.config();

const PORT = process.env.PORT;
const _dirname = path.resolve();

app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/message", messageRoutes);
// app.use("/api/v1/user", userRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
  });
}

app.use((err, req, res, next) => {
  if (err.length > err.limit) {
    console.log(err);
    res.status(400).json({ message: "File too large!" });
  }
});

server.listen(PORT, () => {
  console.log("server running on PORT:" + PORT);
  connectDB();
});
