const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const path = require("path");


async function mergePDFs(filePaths) {
  // Create a new PDFDocument
  const mergedPdf = await PDFDocument.create();

  for (const filePath of filePaths) {
    // Only process PDFs
    if (!filePath.toLowerCase().endsWith(".pdf")) continue;

    const pdfBytes = fs.readFileSync(filePath);
    const pdf = await PDFDocument.load(pdfBytes);

    // Copy all pages from this PDF
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  // Save merged PDF to buffer
  const mergedPdfBytes = await mergedPdf.save();
  return mergedPdfBytes;
}
async function splitPDF(filePath) {
  const pdfBytes = fs.readFileSync(filePath);
  const pdf = await PDFDocument.load(pdfBytes);

  const splitFiles = [];

  // Create a new PDF for each page
  for (let i = 0; i < pdf.getPageCount(); i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(copiedPage);

    const newPdfBytes = await newPdf.save();
    const outputPath = path.join(
      "uploads",
      `split-${Date.now()}-${i + 1}.pdf`
    );
    fs.writeFileSync(outputPath, newPdfBytes);
    splitFiles.push(outputPath);
  }

  return splitFiles;
}

async function addWatermark(filePath, text) {
  const { PDFDocument, rgb, degrees } = require("pdf-lib");
  const fs = require("fs");
  const path = require("path");

  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    const { width, height } = page.getSize();

    page.drawText(text, {
      x: width / 4,
      y: height / 2,
      size: 40,
      color: rgb(0.75, 0.75, 0.75),
      rotate: degrees(45),
      opacity: 0.5,
    });
  });

  const outputPath = path.join("uploads", `watermarked-${Date.now()}.pdf`);
  const newPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, newPdfBytes);

  return outputPath;
}

module.exports = { mergePDFs, splitPDF, addWatermark };