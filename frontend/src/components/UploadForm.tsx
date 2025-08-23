import React, { useState, useCallback } from "react";

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

  const handleUpload = () => {
    // if (!file) return;

    // Mock results for wireframe
    const mockResults = {
      role: "Frontend Engineer",
      skillsFound: ["React", "JavaScript", "HTML", "CSS"],
      missingSkills: ["TypeScript", "Next.js"],
      score: 70,
      suggestions: [
        "Add Next.js experience to highlight modern frontend skills",
        "Mention TypeScript explicitly if you have experience",
      ],
    };
    setResults(mockResults);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div
        style={{
          border: "2px dashed #eee",
          padding: "2rem",
          textAlign: "center",
          backgroundColor: isDragging ? "#eee" : "transparent",
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
          type="file"
          accept=".pdf"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          style={{ display: "none" }}
        />{" "}
        <label
          htmlFor="fileUpload"
          style={{
            display: "inline-block",
            cursor: "pointer",
            marginTop: "1rem",
          }}
          onClick={() =>
            (
              document.querySelector(
                'input[type="file"]'
              ) as HTMLInputElement | null
            )?.click()
          }
        >
          {" "}
          Browse Files{" "}
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
