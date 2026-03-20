import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const Resume = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const handleClear = () => {
    setText("");
    setResult("");
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setResult("Please paste your resume text.");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/resume-analysis`,
        { resumeText: text },
      );

      setResult(res.data.response);
    } catch (err) {
      console.log(err);
      setResult("Error analyzing resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111827] flex items-center justify-center p-8 font-sans">
      <div className="w-full max-w-6xl border border-[#2d3f61] rounded-2xl p-8 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Resume Analysis</h2>
          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold cursor-pointer transition-all"
          >
            🗑 Clear
          </button>
        </div>

        <div className="flex gap-8">

          {/* LEFT SIDE */}
          <div className="w-[40%] flex flex-col gap-6">
            <div>
              <p className="text-gray-300 mb-2">Paste Resume Text:</p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your resume content here..."
                className="w-full h-72 bg-[#1c2a44] border border-[#334155] rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-green-500 transition-shadow resize-none"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white py-3 rounded-xl font-semibold cursor-pointer"
            >
              {loading ? "Analyzing..." : "📊 Analyze Resume"}
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 bg-[#1c2a44] border border-[#334155] rounded-2xl p-6 text-gray-300 overflow-y-auto max-h-[500px]">

            {/* Thinking indicator */}
            {loading && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-400 text-sm italic">Analyzing your resume</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </span>
              </div>
            )}

            {/* Result */}
            {!loading && result && (
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="text-white text-lg font-bold mt-4 mb-2" {...props} />,
                  h2: ({ ...props }) => <h2 className="text-white text-base font-bold mt-4 mb-2" {...props} />,
                  h3: ({ ...props }) => <h3 className="text-green-300 font-semibold mt-3 mb-1" {...props} />,
                  ul: ({ ...props }) => <ul className="list-disc list-inside space-y-1 my-1" {...props} />,
                  ol: ({ ...props }) => <ol className="list-decimal list-inside space-y-1 my-1" {...props} />,
                  li: ({ ...props }) => <li className="text-gray-200 text-sm" {...props} />,
                  p:  ({ ...props }) => <p className="text-gray-200 text-sm mb-2 leading-relaxed" {...props} />,
                  strong: ({ ...props }) => <strong className="text-white font-semibold" {...props} />,
                  code: ({ ...props }) => <code className="bg-[#0f1f3d] text-green-300 px-1 rounded text-xs" {...props} />,
                  hr: () => <hr className="border-[#334155] my-3" />,
                }}
              >
                {result}
              </ReactMarkdown>
            )}

            {/* Placeholder */}
            {!loading && !result && (
              <p className="text-gray-400">
                Paste your resume text to get ATS optimization suggestions,
                keyword analysis, and formatting tips for tech roles.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;