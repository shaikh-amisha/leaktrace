import express from "express";
import multer from "multer";
import { uploadScan } from "../controllers/scanController.js";
import { deleteScan } from "../controllers/scanController.js";
import { getScanDetails } from "../controllers/scanController.js";




const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadScan);
router.delete("/:scanId", deleteScan);
router.get("/:scanId/details", getScanDetails);

export default router;
