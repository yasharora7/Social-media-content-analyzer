import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import uploadRouter from "./routers/upload.router.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://social-media-content-analyzer-pgqo.onrender.com" // your frontend Render URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());


// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.use('/api', upload.single("file"),uploadRouter);

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
// });

// Start server
app.listen(PORT, 
  () => console.log(`🚀 Server running on ${PORT}`)
);
