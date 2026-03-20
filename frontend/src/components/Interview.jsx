import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Interview = () => {
  const [role, setRole] = useState("");
  const [comp, setComp] = useState("");
  const [size, setSize] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setRole("");
    setComp("");
    setSize("");
    setResult("");
  };

  const generateQuestions = async () => {
    if (!role || !comp || !size) {
      setResult("Please select all fields");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/interview-prep`, {
        role,
        company: comp,
        size,
      });

      setResult(res.data.response);
    } catch (err) {
      console.log(err);
      setResult("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111827] flex items-center justify-center p-8 font-sans">
      <div className="w-full max-w-6xl border border-[#2d3f61] rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-row justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold mb-2">
            Interview Preparation
          </h2>
          <button
            onClick={handleClick}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold cursor-pointer transition-all"
          >
            🗑 Clear
          </button>
        </div>

        <div className="flex flex-row gap-6">
          {/* LEFT: Filters */}
          <div className="flex flex-col gap-6 w-[30%]">
            {/* Experience Level */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-200">
                Experience Level:
              </label>
              <select
                className="w-full bg-[#1e293b] text-gray-400 border border-[#334155] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>
                  Click to select experience level
                </option>
                <option value="Entry Level (0-2 years)" className="text-white">
                  Entry Level (0-2 years)
                </option>
                <option value="Mid Level (3-5 years)" className="text-white">
                  Mid Level (3-5 years)
                </option>
                <option value="Senior Level (6+ years)" className="text-white">
                  Senior Level (6+ years)
                </option>
                <option value="Lead/Manager (8+ years)" className="text-white">
                  Lead/Manager (8+ years)
                </option>
              </select>
            </div>

            {/* Target Company */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-200">
                Target Company:
              </label>
              <select
                className="w-full bg-[#1e293b] text-gray-400 border border-[#334155] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                value={comp}
                onChange={(e) => setComp(e.target.value)}
              >
                <option value="" disabled>
                  Click to select target company
                </option>
                <option value="Google" className="text-white">
                  Google
                </option>
                <option value="Amazon" className="text-white">
                  Amazon
                </option>
                <option value="Microsoft" className="text-white">
                  Microsoft
                </option>
                <option value="Meta" className="text-white">
                  Meta
                </option>
                <option value="Apple" className="text-white">
                  Apple
                </option>
                <option value="Netflix" className="text-white">
                  Netflix
                </option>
                <option value="Startup" className="text-white">
                  Startup
                </option>
                <option value="Mid-size Tech Company" className="text-white">
                  Mid-size Tech Company
                </option>
                <option value="Product-based Company" className="text-white">
                  Product-based Company
                </option>
                <option value="Service-based Company" className="text-white">
                  Service-based Company
                </option>
              </select>
            </div>

            {/* Company Size */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-200">
                Company Size:
              </label>
              <select
                className="w-full bg-[#1e293b] text-gray-400 border border-[#334155] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="" disabled>
                  Click to select company size
                </option>
                <option value="Startup (1-50 employees)" className="text-white">
                  Startup (1–50 employees)
                </option>
                <option value="Small (51-200 employees)" className="text-white">
                  Small (51–200 employees)
                </option>
                <option
                  value="Medium (201-1000 employees)"
                  className="text-white"
                >
                  Medium (201–1000 employees)
                </option>
                <option
                  value="Large (1001-10000 employees)"
                  className="text-white"
                >
                  Large (1001–10,000 employees)
                </option>
                <option
                  value="Enterprise (10000+ employees)"
                  className="text-white"
                >
                  Enterprise (10,000+ employees)
                </option>
              </select>
            </div>

            <button
              onClick={generateQuestions}
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white py-3 rounded-xl font-semibold cursor-pointer"
            >
              {loading ? "Generating..." : "🎯 Generate Interview Questions"}
            </button>
          </div>

          {/* RIGHT: Result */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 bg-[#172033] border border-[#2d3f61] rounded-2xl p-6 min-h-100 overflow-y-auto">
              <div className="flex items-start gap-4">
                <div className="bg-[#243454] text-gray-100 p-5 rounded-2xl rounded-tl-sm text-sm leading-relaxed border border-[#334155] w-full max-h-125 overflow-y-auto">
                  <span className="font-bold text-white block mb-3">
                    🤖 AI Career Mentor:
                  </span>

                  {/* Thinking indicator */}
                  {loading && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 italic">Thinking</span>
                      <span className="flex gap-1">
                        <span
                          className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></span>
                      </span>
                    </div>
                  )}

                  {/* Result */}
                  {!loading && result && (
                    <ReactMarkdown
                      components={{
                        h1: ({ ...props }) => (
                          <h1
                            className="text-white text-base font-bold mt-3 mb-1"
                            {...props}
                          />
                        ),
                        h2: ({ ...props }) => (
                          <h2
                            className="text-white text-sm font-bold mt-3 mb-1"
                            {...props}
                          />
                        ),
                        h3: ({ ...props }) => (
                          <h3
                            className="text-orange-300 font-semibold mt-2 mb-1"
                            {...props}
                          />
                        ),
                        ul: ({ ...props }) => (
                          <ul
                            className="list-disc list-inside space-y-1 my-1"
                            {...props}
                          />
                        ),
                        ol: ({ ...props }) => (
                          <ol
                            className="list-decimal list-inside space-y-1 my-1"
                            {...props}
                          />
                        ),
                        li: ({ ...props }) => (
                          <li className="text-gray-200 text-sm" {...props} />
                        ),
                        p: ({ ...props }) => (
                          <p
                            className="text-gray-200 text-sm mb-2 leading-relaxed"
                            {...props}
                          />
                        ),
                        strong: ({ ...props }) => (
                          <strong
                            className="text-white font-semibold"
                            {...props}
                          />
                        ),
                        code: ({ ...props }) => (
                          <code
                            className="bg-[#1a2744] text-orange-300 px-1 rounded text-xs"
                            {...props}
                          />
                        ),
                        hr: () => <hr className="border-[#334155] my-2" />,
                      }}
                    >
                      {result}
                    </ReactMarkdown>
                  )}

                  {/* Placeholder */}
                  {!loading && !result && (
                    <p className="text-gray-400">
                      Select your experience level, target company, and company
                      size to get customized interview questions.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
