import Scan from "../models/Scan.js";

export const getHistoryData = async (req, res) => {
  try {
    // 1. Fetch last 10 scans
    const scans = await Scan.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("fileName totalEmails exposedCount safeCount createdAt");

    // 2. Build per-scan trend (oldest → newest)
    const trend = scans
      .slice() // avoid mutating original array
      .reverse()
      .map(scan => ({
        label: new Date(scan.createdAt).toLocaleTimeString(),
        exposed: scan.exposedCount,
        safe: scan.safeCount
      }));

    res.json({
      trend,
      scans
    });

  } catch (error) {
    console.error("History API error:", error);
    res.status(500).json({ message: "Failed to load history data" });
  }
};
