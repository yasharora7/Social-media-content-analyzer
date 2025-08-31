# 📊 Social Media Content Analyzer  

A full-stack application that extracts and analyzes text from uploaded files (PDF, images, etc.) using **Node.js (Express)** for the backend and **React (Vite)** for the frontend.  

---

## 🚀 Features
- Upload PDF or image files  
- Extract text using backend services  
- Display extracted text in a clean UI  
- Environment-based API URL (`.env`) support for local & deployed environments  

---

## 🏗 Project Structure
```
social-media-analyzer/
│── backend/
│   ├── server.js
│   ├── controllers/
│   │    └── uploadController.js
│   ├── services/
│   │    ├── extractionService.js
│   │    ├── analyzerService.js
│   ├── uploads/ (temp storage)
│   └── .env
│
│── frontend/  (React + Vite app)
│   ├── public/
│   ├── src/
│   │    ├── components/
│   │    │    ├── FileUpload.jsx
│   │    │    └── Result.jsx
│   │    ├── App.jsx
│   │    ├── index.js
│   │    └── styles.css
│   ├── package.json
│   └── vite.config.js
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/yasharora7/Social-media-content-analyzer.git
cd Social-media-content-analyzer
```

---

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
PORT=5000
```

Run backend:
```bash
npm start
```
Backend runs at → `http://localhost:5000`

---

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` in `frontend/`:
```
# For local
VITE_API_URL=http://localhost:5000

# For Render/Production (replace with your backend URL)
# VITE_API_URL=https://your-backend.onrender.com
```

Run frontend:
```bash
npm run dev
```
Frontend runs at → `http://localhost:5173`

---

## 📂 Example `App.jsx`
Here’s the main file that connects frontend → backend:

```jsx
import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setText(data.text || "No text extracted");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Social Media Analyzer</h1>
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg">
        <input type="file" onChange={handleFileChange} className="mb-4 w-full" />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload & Analyze"}
        </button>
        {text && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg max-h-64 overflow-y-auto whitespace-pre-wrap">
            <h2 className="font-semibold mb-2">Extracted Text:</h2>
            <p>{text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

---

## 🌐 Deployment (Render)

### Deploy Backend
1. Push code to GitHub  
2. Create a **Web Service** on [Render](https://render.com/)  
3. Set root directory → `backend/`  
4. Build command → `npm install`  
5. Start command → `npm start`  
6. Add environment variable:  
   ```
   PORT=10000 (Render assigns automatically)
   ```

### Deploy Frontend
1. Create another **Static Site** on Render  
2. Root directory → `frontend/`  
3. Build command → `npm install && npm run build`  
4. Publish directory → `dist`  
5. Add environment variable in Render frontend:  
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

---


