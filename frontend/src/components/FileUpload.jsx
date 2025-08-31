import { useRef, useState } from "react";
import "../App.css";

export default function FileUpload({ onUpload }) {
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file) => {
    if (file) {
      setFileName(file.name);
      onUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e.target.files[0])}
      />

      {/* Drag & Drop Area */}
      <div className={`drop-zone ${isDragging ? "dragging" : ""} ${ fileName ? "has-file" : ""  }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current.click()}
      >
        {fileName ? `📄 ${fileName}` : "Drag & Drop a file here or click to upload"}
      </div>
    </div>
  );
}
