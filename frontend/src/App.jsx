import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Result from "./components/Result";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const API_URL = import.meta.env.REACT_APP_API_URL;
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Upload error:", err);
      setResult({ error: "Upload failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📊 Social Media Content Analyzer</h1>

      <FileUpload onUpload={handleUpload} />

      {loading && <div className="loading">⏳ Processing...</div>}

      {result && <Result data={result} />}
    </div>
  );
}
