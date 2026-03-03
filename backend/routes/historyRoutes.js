import express from "express";
import { getHistoryData } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", getHistoryData);

export default router;
