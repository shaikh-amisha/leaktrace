import mongoose from "mongoose";

const scanResultSchema = new mongoose.Schema({
  scanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scan",
    required: true
  },
  email: { type: String, required: true },
  exposed: { type: Boolean, required: true }
});

export default mongoose.model("ScanResult", scanResultSchema);
