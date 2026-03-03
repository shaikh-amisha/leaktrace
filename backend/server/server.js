import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import scanRoutes from "../routes/scanRoutes.js";
import dashboardRoutes from "../routes/dashboardRoutes.js";
import historyRoutes from "../routes/historyRoutes.js"; 
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
// Serve frontend
app.use(express.static(path.join(__dirname, "../../client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dashboard.html"));
});


app.use("/api/scans", scanRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/history", historyRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

