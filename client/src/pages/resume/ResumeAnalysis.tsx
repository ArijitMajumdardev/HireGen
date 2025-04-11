import React, { useRef, useState } from "react";

const ResumeAnalysis = () => {
  const [resumeText, setResumeText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResumeText(data.text || "Failed to extract text.");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log(e.dataTransfer.files[0]);
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[100vh] w-full max-w-[1920px] m-auto pt-16">
      <div className="p-4 w-full md:w-2/5 h-[40vh]  md:min-h-[80vh] text-center">
        <h1 className="text-2xl font-bold mb-4">Upload Resume</h1>

        {/* Drag and Drop Zone */}

        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-all  ${
            isDragging ? "border-primary-1 bg-primary-1/10" : "border-gray-500"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <p className="mb-2 text-gray-400">
            Drag and drop your resume here, or click to select
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            Browse
          </button>

          {file && (
            <p className="mt-2 text-sm text-white">
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-primary-1 text-white rounded"
          onClick={handleUpload}
          disabled={!file}
        >
          Analyse
        </button>

        {resumeText && (
          <div className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap max-h-[400px]  overflow-y-auto">
            {resumeText}
          </div>
        )}
      </div>

      <div className=" w-full md:w-3/5 min-h-[80vh]"></div>
    </div>
  );
};

export default ResumeAnalysis;
