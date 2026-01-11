import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();

// middleware
app.use(express.json());  
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",   
  credentials: true,
}));



const PORT = process.env.PORT || 5022;
const URI = process.env.MONGODB_URI;

try {
  await mongoose.connect(URI);
  console.log("MongoDB connected");
} catch (error) {
  console.log(error);
}


app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// .....................code for deployement......................
// if (process.env.NODE_ENV === "production") {
//   const dirPath = path.resolve();

//   // serve frontend static files
//   app.use(express.static(path.join(dirPath, "Frontend", "dist")));

//   // SPA fallback (NO ROUTE PATTERN → NO ERROR)
//   app.use((req, res) => {
//     res.sendFile(path.join(dirPath, "Frontend", "dist", "index.html"));
//   });
// }
// ...............................................................

server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

  
