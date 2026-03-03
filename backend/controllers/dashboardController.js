import Scan from "../models/Scan.js";

export const getDashboardSummary = async(req,res) =>{
    try{

        // total scans
        const totalScans = await Scan.countDocuments();

        // Aggregate exposed and safe accounts
        const stats = await Scan.aggregate([   
            {
                $group:{
                    _id: null,
                    totalExposed: { $sum: "$exposedCount" },
                    totalSafe: { $sum: "$safeCount" }
                }
            }
        ]);


    
    const recentScans = await Scan.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("fileName totalEmails exposedCount safeCount createdAt");

    res.json({
      totalScans,
      totalExposed: stats[0]?.totalExposed || 0,
      totalSafe: stats[0]?.totalSafe || 0,
      recentScans
    });

  } catch (error) {
    res.status(500).json({ message: "Dashboard data fetch failed" });
  }


};