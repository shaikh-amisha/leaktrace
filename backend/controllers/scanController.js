import fs from "fs";
import csv from "csv-parser";
import Scan from "../models/Scan.js";
import ScanResult from "../models/ScanResult.js";
import {isExposed} from "../utils/exposureCheck.js";

export const uploadScan = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "CSV file is required" });
}

const emails = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      if (row.email) {
        emails.push(row.email.trim().toLowerCase());
      }
    })
    .on("end", async () => {
      if (emails.length === 0) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "No valid emails found" });
      }

      let exposedCount = 0;
      const results = [];

      for (const email of emails) {
        const exposed = isExposed(email);
        if (exposed) exposedCount++;
        results.push({ email, exposed });
      }

      const scan = await Scan.create({
        fileName: req.file.originalname,
        totalEmails: emails.length,
        exposedCount,
        safeCount: emails.length - exposedCount
      });

      await ScanResult.insertMany(
        results.map((r) => ({ ...r, scanId: scan._id }))
      );

      fs.unlinkSync(req.file.path);

      res.status(201).json({
        scanId: scan._id,
        total: scan.totalEmails,
        exposed: scan.exposedCount,
        safe: scan.safeCount,
        status: scan.status
      });
    });
};

export const deleteScan = async (req, res) => {
  try {
    const { scanId } = req.params;

    // delete scan itself
    await Scan.findByIdAndDelete(scanId);

    // delete all emails related to this scan
    await ScanResult.deleteMany({ scanId });

    res.json({ message: "Scan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete scan" });
  }
};


export const getScanDetails = async (req, res) => {
  try {
    const { scanId } = req.params;

    // 1. Get scan summary
    const scan = await Scan.findById(scanId);
    if (!scan) {
      return res.status(404).json({ message: "Scan not found" });
    }

    // 2. Get email-level results
    const results = await ScanResult.find({ scanId })
      .select("email exposed -_id");

    res.json({
      scan,
      results
    });

  } catch (error) {
    console.error("Post-scan error:", error);
    res.status(500).json({ message: "Failed to load scan details" });
  }
};

