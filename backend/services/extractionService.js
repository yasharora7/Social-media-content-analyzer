import fs from "fs/promises";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const extractText = async (filePath, mimeType) => {
  if (mimeType === "application/pdf") {
    const buffer = await fs.readFile(filePath); 
    const pdfData = await pdfParse(buffer);
    return pdfData.text;
  }

  if (mimeType.startsWith("image/")) {
    const Tesseract = require("tesseract.js");
    const result = await Tesseract.recognize(filePath, "eng");
    return result.data.text;
  }

  throw new Error(`Unsupported file type: ${mimeType}`);
};
