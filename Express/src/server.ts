import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import transactionRoutes from "./routes/transactionRoutes";
import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
console.log("URI seen by Node:", process.env.MONGO_URI);
connectDB();

const app = express();

app.use(cors());          // allow the frontend's origin to call this API
app.use(express.json());  // parse incoming JSON bodies into req.body

import authRoutes from "./routes/authRoutes";
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));