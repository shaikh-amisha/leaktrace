import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
    {
    fileName: { type: String, required: true },
    totalEmails: { type: Number, required: true },
    exposedCount: { type: Number, required: true },
    safeCount: { type: Number, required: true },
    status: { type: String, default: "Completed" }
    },
    {timestamps:true}
);

export default mongoose.model("Scan", scanSchema);

