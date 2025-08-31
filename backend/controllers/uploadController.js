import { extractText } from "../services/extractionService.js";
import { analyzeContent } from "../services/analyzerService.js";
import fs from "fs/promises";

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const text = await extractText(req.file.path, req.file.mimetype);
    const analysis = await analyzeContent(text);
    await fs.unlink(req.file.path);
    res.json({ text, analysis });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
};

export { uploadFile };
