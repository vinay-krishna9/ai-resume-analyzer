import React, { useState, useCallback } from "react";
import { uploadFile } from "../api";

interface UploadFormProps {
  setResults: React.Dispatch<React.SetStateAction<any>>;
}

const UploadForm: React.FC<UploadFormProps> = ({ setResults }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const result = await uploadFile(file);
    setResults(result);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div
        style={{
          border: "2px dashed #aaa",
          borderColor: isDragging ? "#007bff" : "#aaa",
          padding: "2rem",
          textAlign: "center",
          backgroundColor: isDragging ? "#f0f8ff" : "transparent",
          transition: "all 0.2s ease",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {file ? (
          <p>📄 {file.name}</p>
        ) : (
          <p>Drag & drop your resume here, or click to select a file</p>
        )}
        <input
          id="fileUpload"
          type="file"
          accept=".pdf"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          style={{ display: "none" }}
        />

        <label
          htmlFor="fileUpload"
          style={{
            display: "inline-block",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Browse Files
        </label>
      </div>
      <button
        onClick={handleUpload}
        style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
      >
        Analyze Resume
      </button>
    </div>
  );
};

export default UploadForm;
