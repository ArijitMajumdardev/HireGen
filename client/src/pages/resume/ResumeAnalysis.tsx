import API from "@/lib/ServerAPI";
import React, { useRef, useState } from "react";
import { CheckCircle, XCircle, Lightbulb, Circle, LoaderCircle } from "lucide-react"; // At the top of the file
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const ResumeAnalysis = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [analysis, setAnalysis] = useState<{
    match: number;
    matchingSkills: string[];
    weakAreas: string[];
    improvements: string[];
  } | null>(null);
    const [loading,setLoading] = useState(false)

    const handleUpload = async () => {
      setLoading(true)
   try {
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    const res = await API.post("/analyse-resume", formData);

    console.log(res.data);
    setLoading(false);
       
    setAnalysis(res.data.analysis);
   } catch (error:any) {
    setLoading(false);
    toast.error(error.response.data);
   }
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
      <div className="p-4 w-full md:w-2/5 h-[40vh] min-h-[100vh] text-center ">
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
            className="px-4 py-2 bg-accent-1/60 text-white rounded"
          >
            Browse
          </button>

          {file && (
            <p className="mt-2 text-sm text-white">
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4 mt-10">Paste Job Description</h2>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={16}
          placeholder="Paste the job description here..."
          className="w-full h-[30vh] p-4 bg-transparent outline-none border border-gray-300 rounded text-sm resize-none"
        ></textarea>

        <button
          className="mt-4 px-4 py-2 bg-primary-1 text-white rounded"
          onClick={handleUpload}
          disabled={!file || !jobDescription}
        >
          Analyse
        </button>
      </div>

      <div className="w-full md:w-3/5 min-h-[80vh] p-6 overflow-y-auto">
        {analysis ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary-1">
              Analysis Results
            </h2>

            <div className="bg-primary-1/10 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Match Score</h3>
              <div className={`text-5xl font-bold  ${analysis.match<50?"text-red-400":"text-green-400"}`}>
                {analysis.match}%
              </div>
              <p className="text-gray-600 mt-1">
                This indicates how well your resume aligns with the job
                description.
              </p>
            </div>

            <div className="bg-primary-1/10 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} />
                Matching Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.matchingSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-primary-1/10 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <XCircle className="text-red-500" size={20} />
                Weak Areas
              </h3>
              <ul className="list-disc ml-6 text-sm text-red-600 space-y-1">
                {analysis.weakAreas.map((weak, idx) => (
                  <li key={idx}>{weak}</li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-1/10 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="text-yellow-500" size={20} />
                Suggestions for Improvement
              </h3>
              <ul className="list-disc ml-6 text-sm text-yellow-700 space-y-1">
                {analysis.improvements.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
                      <div className="text-center  flex justify-center text-gray-400 pt-24">
                          {
                              loading ?<span className="animate-spin"> <LoaderCircle strokeWidth={3} /></span> : <span>
                                  
                                  Analysis results will appear here once generated.
                              </span>
                          }
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysis;
