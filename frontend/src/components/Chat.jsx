import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Chat = () => {
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");
  const [focus, setFocus] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Career Navigator specialized in tech careers. Ask me anything.",
    },
  ]);
  const [msg, setMsg] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const sendMessage = async () => {
    if (!msg.trim()) return;

    const newMessages = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setMsg("");
    setThinking(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/career-chat`, {
        messages: newMessages,
        role,
        experience: exp,
        focus,
      });

      setMessages([
        ...newMessages,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (err) {
      console.log(err);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm your AI Career Navigator specialized in tech careers. Ask me anything.",
      },
    ]);
    setMsg("");
  };

  return (
    <div className="bg-[#111827] flex items-center justify-center p-8 font-sans">
      <div className="flex w-full max-w-6xl gap-8 border border-[#2d3f61] rounded-2xl p-8 shadow-2xl">
        {/* Left Column: Your Profile */}
        <div className="w-[30%] flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-white mb-2">Your Profile</h2>

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
              Experience:
            </label>
            <select
              className="w-full bg-[#1e293b] text-gray-400 border border-[#334155] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              value={exp}
              onChange={(e) => setExp(e.target.value)}
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

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-200">
              Focus Area:
            </label>
            <select
              className="w-full bg-[#1e293b] text-gray-400 border border-[#334155] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
            >
              <option value="" disabled>
                Click to select focus area
              </option>
              <option value="Job Applications" className="text-white">
                Job Applications
              </option>
              <option value="Skill Development" className="text-white">
                Skill Development
              </option>
              <option value="Career Growth" className="text-white">
                Career Growth
              </option>
              <option value="Interview Preparation" className="text-white">
                Interview Preparation
              </option>
              <option value="Salary Negotiation" className="text-white">
                Salary Negotiation
              </option>
              <option value="Remote Work" className="text-white">
                Remote Work
              </option>
              <option value="Networking" className="text-white">
                Networking
              </option>
              <option value="Portfolio Building" className="text-white">
                Portfolio Building
              </option>
            </select>
          </div>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Chat Panel */}
          <div className="flex-1 bg-[#172033] border border-[#2d3f61] rounded-2xl p-6 min-h-100 max-h-130 overflow-y-auto">
            <div className="flex flex-col gap-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${m.role === "user" ? "justify-end" : ""}`}
                >
                  {m.role === "assistant" && (
                    <div className="text-xl mt-1">🤖</div>
                  )}

                  <div
                    className={`p-4 rounded-xl max-w-[80%] text-sm border ${
                      m.role === "assistant"
                        ? "bg-[#243454] border-[#334155] text-white"
                        : "bg-blue-600 text-white border-blue-500"
                    }`}
                  >
                    {m.role === "assistant" ? (
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
                              className="text-blue-300 font-semibold mt-2 mb-1"
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
                              className="bg-[#1a2744] text-blue-300 px-1 rounded text-xs"
                              {...props}
                            />
                          ),
                          hr: () => <hr className="border-[#334155] my-2" />,
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    ) : (
                      <p>{m.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Thinking Indicator */}
              {thinking && (
                <div className="flex items-start gap-3">
                  <div className="text-xl mt-1">🤖</div>
                  <div className="bg-[#243454] border border-[#334155] rounded-xl px-5 py-4 flex items-center gap-2">
                    <span className="text-gray-400 text-sm italic">
                      Thinking
                    </span>
                    <span className="flex gap-1">
                      <span
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-4 items-center mt-2">
            <input
              type="text"
              placeholder="Ask about tech careers, job applications, interviews..."
              className="flex-1 bg-[#1e293b] text-white border border-[#334155] rounded-xl px-5 py-3.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={thinking}
            />

            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-red-700 text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Clear
            </button>

            <button
              onClick={sendMessage}
              disabled={thinking}
              className="flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M12 2C6.48 2 2 5.58 2 10c0 2.5 1.48 4.75 3.75 6.13-.15 1.5-.75 2.87-1.5 4.12 2.25-.25 4.25-1.12 5.75-2.5 1.13.25 2.38.5 3.75.5 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
              </svg>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
