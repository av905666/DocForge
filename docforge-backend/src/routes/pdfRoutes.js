const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const {
  mergePDFController,
  splitPDFController,
  watermarkController,
  compressPDF
} = require("../controllers/pdfController");

const router = express.Router();
//Merge Route
router.post("/merge", upload.array("files", 10), mergePDFController);

const uploadSingle = require("../middlewares/uploadMiddleware").single("file"); // for single PDF
router.post("/split", uploadSingle, splitPDFController);
router.post("/watermark", uploadSingle, watermarkController);
router.post("/compress", upload.single("file"), compressPDF);
module.exports = router;