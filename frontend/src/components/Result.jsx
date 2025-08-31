import { useState, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../App.css";

export default function Result({ data }) {

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };
  const [showDetails, setShowDetails] = useState(true);
  const dashboardRef = useRef();

  const sentimentColors = {
    positive: "#16a34a",
    negative: "#dc2626",
    neutral: "#6b7280",
  };

  const chartData = [
    { name: "Sentiment", value: data.analysis.sentimentScore || 0 },
    { name: "Tone", value: data.analysis.toneScore || 0 },
  ];

  const toneData = Object.entries(data.analysis.tones || {}).map(([key, value]) => ({
    name: key,
    value,
  }));

  const COLORS = ["#3b82f6", "#f97316", "#10b981", "#f43f5e", "#8b5cf6"];

  const downloadPDF = async () => {
    const element = dashboardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = 190;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
    pdf.save(`${data.filename}-analysis.pdf`);
  };

  if (data.error) {
    return <div className="error-box">❌ Error: {data.error}</div>;
  }

  return (
    <div ref={dashboardRef} className="result-container">
      <div className="result-header">
        <h3>{data.filename}</h3>
        <div>
          <button
            className="toggle-button"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          <button className="download-button" onClick={downloadPDF}>
            📄 Download PDF
          </button>
        </div>
      </div>

       {/* Extracted Text */}
      <p className="section-title">Extracted Text:</p>
      <div className="extracted-text-container">
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
        <div className="extracted-text">{data.text}</div>
      </div>


      {showDetails && (
        <div className="details">

          {/* Sentiment Meter */}
          <div className="sentiment-meter">
            <p className="section-title">Overall Sentiment</p>
            <div className="meter-bar">
              <div
                className="meter-fill"
                style={{
                  width: `${(data.analysis.sentimentScore || 0) * 120}%`,
                  backgroundColor: sentimentColors[data.analysis.sentiment],
                }}
              ></div>
            </div>
            <span
              className="sentiment-label"
              style={{ color: sentimentColors[data.analysis.sentiment] }}
            >
              {data.analysis.sentiment?.toUpperCase()}
            </span>
          </div>

          {/* Bar Chart */}
          <div className="chart-section">
            <p className="section-title">Sentiment & Tone Scores</p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="red" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="chart-section">
            <p className="section-title">Tone Distribution</p>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={toneData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {toneData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Keywords */}
          <div className="keywords-section">
            <p className="section-title">Keywords</p>
            <div className="keywords-container">
              {data.analysis.keywords?.map((k, i) => (
                <span key={i} className={`keyword-badge keyword-animate-${i % 5}`}>
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="summary-section">
            <p className="section-title">Summary</p>
            <p className="summary-text">{data.analysis.summary}</p>
          </div>

        </div>
      )}
    </div>
  );
}
