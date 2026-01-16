import {
  ArrowLeft,
  Check,
  Copy,
  Loader2,
  Send,
  Sparkles,
  Trash2,
  User
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom"; // 👈 For Navigation
import API from "../apiHelper/api";

const AiTutor = () => {
  const navigate = useNavigate(); // 👈 Init Hook
  const [messages, setMessages] = useState([
    { 
      role: "model", 
      text: "Hello! I am your AI Tutor. Ask me anything about your courses, code, or assignments! 📚✨" 
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textOverride) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Sending history for context awareness
      const historyToSend = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await API.post("/chat", {
        message: textToSend,
        history: historyToSend 
      });

      const data = res.data;
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);

    } catch (err) {
      console.error("AI Chat Error:", err);
      const errorMsg = err.response?.data?.details || err.response?.data?.error || "Connection Error.";
      setMessages((prev) => [...prev, { role: "model", text: `⚠️ **Error**: ${errorMsg}` }]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{ role: "model", text: "Chat cleared. What else can I help you with?" }]);
  };

  const suggestions = [
    "Explain Quantum Physics like I'm 5",
    "Write a Python script for Bubble Sort",
    "How do I prepare for my finals?",
    "Summarize the history of Pakistan"
  ];

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0f1115] text-gray-100 font-sans">
      
      {/* ================= HEADER / NAVBAR ================= */}
      <div className="z-50 bg-[#0f1115]/80 backdrop-blur-md border-b border-white/5 py-3 px-4 sm:px-6 flex items-center justify-between">
         
         {/* Left: Back Button & Brand */}
         <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/")} 
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all"
              title="Back to Home"
            >
               <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-900/40">
                  A
               </div>
               <span className="font-bold text-lg tracking-tight text-white hidden sm:block">
                  ALIF-AKH<span className="text-emerald-500">ACADEMY</span>
               </span>
            </div>
         </div>

         {/* Right: AI Label & Clear Chat */}
         <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-xs font-medium text-emerald-400">AI Tutor Online</span>
            </div>
            <button 
              onClick={clearChat} 
              className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" 
              title="Clear Chat"
            >
               <Trash2 size={20} />
            </button>
         </div>
      </div>

      {/* ================= CHAT AREA ================= */}
      <div className="flex-1 flex flex-col pt-4 max-w-5xl mx-auto w-full px-4 sm:px-6 overflow-hidden">
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar pb-4 min-h-0">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              
              {m.role === "model" && (
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-emerald-900/50">
                  <Sparkles size={16} className="text-white" />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`relative group max-w-[85%] sm:max-w-[75%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-md ${
                  m.role === "user"
                    ? "bg-emerald-600 text-white rounded-br-sm"
                    : "bg-[#1a1d21] border border-white/5 text-gray-200 rounded-bl-sm"
                }`}
              >
                {/* Copy Button (Visible on Hover) */}
                <button 
                  onClick={() => copyToClipboard(m.text, i)}
                  className={`absolute top-2 right-2 p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100 ${
                    m.role === "user" ? "bg-emerald-700/50 hover:bg-emerald-800" : "bg-white/5 hover:bg-white/10"
                  }`}
                  title="Copy"
                >
                  {copiedIndex === i ? (
                    <Check size={14} className="text-emerald-300" />
                  ) : (
                    <Copy size={14} className="text-gray-400" />
                  )}
                </button>

                {m.role === "model" ? (
                  <div className="prose prose-invert prose-sm max-w-none break-words pr-6">
                    <ReactMarkdown
                      components={{
                        pre: ({node, ...props}) => <div className="overflow-x-auto w-full my-2 bg-black/30 p-3 rounded-lg border border-white/5"><pre {...props} /></div>,
                        code: ({node, ...props}) => <code className="bg-black/30 rounded px-1.5 py-0.5 text-emerald-300 font-mono text-xs" {...props} />
                      }}
                    >
                      {m.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap break-words pr-6">{m.text}</p>
                )}
              </div>

              {m.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0 mt-1">
                  <User size={16} className="text-gray-300" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles size={16} />
               </div>
               <div className="bg-[#1a1d21] border border-white/5 px-5 py-3.5 rounded-2xl rounded-bl-sm flex items-center gap-2 text-gray-400 text-sm">
                  <Loader2 className="animate-spin" size={16} /> Thinking...
               </div>
            </div>
          )}
          
          <div ref={scrollRef} />
        </div>

        {/* Suggestions */}
        {messages.length < 3 && !loading && (
          <div className="flex-none grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {suggestions.map((s, i) => (
              <button 
                key={i}
                onClick={() => handleSend(s)}
                className="text-left text-xs text-gray-400 bg-[#1a1d21] hover:bg-[#25282e] hover:border-emerald-500/30 border border-white/5 p-3 rounded-lg transition-colors flex items-center justify-between group"
              >
                {s} <Send size={12} className="opacity-0 group-hover:opacity-100 text-emerald-500 transition-opacity" />
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="flex-none pb-6 pt-2">
          <div className="relative bg-[#1a1d21] border border-white/10 rounded-xl shadow-lg focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="w-full bg-transparent border-none outline-none text-white px-4 py-3 text-sm placeholder-gray-500 resize-none max-h-32 min-h-[50px] custom-scrollbar"
              rows={1}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="absolute right-2 bottom-2 p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-emerald-900/20"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-600 mt-2">
            AI can make mistakes. Always verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiTutor;