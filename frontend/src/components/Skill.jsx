import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Skill = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");

  const handleClear = () => {
    setRole("");
    setSkills("");
    setResult("");
  };

  const handleAnalyze = async () => {
    if (!role.trim() || !skills.trim()) {
      setResult("Please enter your role and skills.");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/skill-gap`, {
        role,
        skills,
      });

      setResult(res.data.response);
    } catch (err) {
      console.log(err);
      setResult("Error generating skill gap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111827] flex items-center justify-center p-8 font-sans">
      <div className="w-full max-w-6xl gap-8 border border-[#2d3f61] rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-row justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold mb-2">
            Skill Gap Analysis
          </h2>
          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold cursor-pointer transition-all"
          >
            🗑 Clear
          </button>
        </div>

        <div className="flex gap-8">
          {/* LEFT: Inputs */}
          <div className="flex flex-col gap-6 w-[30%]">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-200">
                Your Role:
              </label>
              <input
                type="text"
                placeholder="e.g., Full Stack Developer"
                className="w-full bg-[#1e293b] text-white border border-[#334155] rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-200">
                Your Skills:
              </label>
              <textarea
                id="current-skills"
                placeholder="React, Node.js, MongoDB, Express.js, JavaScript, HTML, CSS..."
                className="w-full bg-[#1e293b] text-white border border-[#334155] rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none h-32"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold cursor-pointer transition-all"
            >
              {loading ? "Analyzing..." : "📊 Analyze Skill Gap"}
            </button>
          </div>

          {/* RIGHT: Result */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 bg-[#172033] border border-[#2d3f61] rounded-2xl p-6 min-h-100 max-h-125 overflow-y-auto">
              <span className="font-bold text-white block mb-3">
                🤖 AI Career Mentor:
              </span>

              {/* Thinking indicator */}
              {loading && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm italic">Thinking</span>
                  <span className="flex gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </span>
                </div>
              )}

              {/* Result with markdown */}
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
                        className="text-green-300 font-semibold mt-2 mb-1"
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
                      <strong className="text-white font-semibold" {...props} />
                    ),
                    code: ({ ...props }) => (
                      <code
                        className="bg-[#1a2744] text-green-300 px-1 rounded text-xs"
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
                <p className="text-gray-400 text-sm">
                  Enter your target role and current skills to get a
                  personalized learning roadmap with recommended resources.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skill;
