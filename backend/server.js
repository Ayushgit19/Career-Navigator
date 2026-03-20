import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://career-navigator-frontend-eight.vercel.app"
  ],
  methods: ["GET", "POST"],
}));

app.use(express.json());

app.use("/api", aiRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

export default app;