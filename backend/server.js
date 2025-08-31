import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import uploadRouter from "./routers/upload.router.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.use('/api/upload', upload.single("file"),uploadRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// Start server
app.listen(PORT, 
  () => console.log(`🚀 Server running on http://localhost:${PORT}`)
);
