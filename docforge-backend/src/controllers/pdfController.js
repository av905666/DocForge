const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const { mergePDFs } = require("../services/pdfService");
const { splitPDF } = require("../services/pdfService");
const { addWatermark } = require("../services/pdfService");

async function mergePDFController(req, res) {
  try {
    // Get paths of uploaded files
    const filePaths = req.files.map((file) => file.path);

    // Merge PDFs
    const mergedPdfBytes = await mergePDFs(filePaths);

    // Save merged PDF to a new file
    const outputPath = path.join("uploads", `merged-${Date.now()}.pdf`);
    fs.writeFileSync(outputPath, mergedPdfBytes);

    res.download(outputPath, "merged.pdf", (err) => {
      if (err) console.log(err);

      // Optional: delete uploaded files + merged file after download
      filePaths.forEach((file) => fs.unlinkSync(file));
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error merging PDFs", error: err.message });
  }
}

async function splitPDFController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF uploaded" });
    }

    const splitFiles = await splitPDF(req.file.path);

    // For simplicity, return first split PDF
    res.download(splitFiles[0], "split-page-1.pdf", (err) => {
      if (err) console.log(err);

      // Optional: cleanup uploaded + split files
      fs.unlinkSync(req.file.path);
      splitFiles.forEach((file) => fs.unlinkSync(file));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error splitting PDF", error: err.message });
  }
}

async function watermarkController(req, res) {
  try {
    const text = req.body.text;

    if (!req.file || !text) {
      return res.status(400).json({ message: "Missing file or watermark text" });
    }

    const outputPath = await addWatermark(req.file.path, text);

    res.download(outputPath, "watermarked.pdf", (err) => {
      if (err) console.log(err);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding watermark" });
  }
}


async function compressPDF(req, res) {
  try {
    const inputPath = req.file.path;
    const outputPath = path.join(
      path.dirname(inputPath),
      "compressed-" + req.file.originalname
    );

    // Using Ghostscript for compression
const command = `"C:\\Program Files\\gs\\gs10.06.0\\bin\\gswin64c.exe" -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;
    exec(command, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Compression failed");
      }

      res.download(outputPath, () => {
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error compressing PDF");
  }
};

module.exports = {
  mergePDFController,
  splitPDFController,
  watermarkController,
  compressPDF
};