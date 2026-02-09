import { motion } from "framer-motion";
import {
  ArrowLeft,
  Atom, Book, Calculator, Dna,
  FileText,
  FlaskConical, Globe,
  GraduationCap,
  Laptop
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
// If you are using react-router-dom, uncomment the line below
// import { useNavigate } from "react-router-dom";
import API from "../../apiHelper/api.js";

// Helper to pick icons based on subject title
const getIconForSubject = (title) => {
  const t = title.toLowerCase();
  if (t.includes("computer")) return <Laptop size={18} />;
  if (t.includes("pakistan") || t.includes("history")) return <Globe size={18} />;
  if (t.includes("chemistry")) return <FlaskConical size={18} />;
  if (t.includes("physics")) return <Atom size={18} />;
  if (t.includes("biology")) return <Dna size={18} />;
  if (t.includes("math")) return <Calculator size={18} />;
  return <Book size={18} />;
};

const DynamicNavbar = ({ active, onSelect }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  
  // Hook for navigation (Uncomment if using React Router)
  // const navigate = useNavigate(); 

  const handleBackHome = () => {
    // navigate("/"); // Use this if using React Router
    window.location.href = "/"; // Fallback standard navigation
  };

  // 1. Fetch Subjects from DB
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await API.get("/prep/subjects");
        setSubjects(res.data);
        
        // Auto-select first subject if none active
        if (res.data.length > 0 && !active) {
          onSelect(res.data[0]);
        }
      } catch (err) {
        console.error("Failed to load subjects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  // 2. Auto-scroll to active item
  useEffect(() => {
    if (active && scrollRef.current) {
      const activeEl = document.getElementById(`subj-${active._id}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [active]);

  return (
    // Outer container is sticky so both bars stick to the top
    <div className="sticky top-0 z-40 w-full shadow-md">
      
      {/* --- 1. TOP GREEN NAVBAR --- */}
      <div className="bg-emerald-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Side: Back Arrow & Brand Name */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBackHome} 
              className="p-2 rounded-full hover:bg-emerald-700 transition-colors"
              title="Back to Home"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">
              AlifAkhAcademy
            </h1>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Download PDF Notes Button (Hidden on very small screens) */}
            <button className="hidden md:flex items-center gap-2 text-sm font-medium text-emerald-50 hover:text-white hover:bg-emerald-700 px-3 py-2 rounded-lg transition-all">
              <FileText size={18} />
              <span>Download PDF Notes</span>
            </button>

            {/* Register Courses Button */}
            <button className="flex items-center gap-2 bg-white text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-50 hover:shadow-md transition-all transform hover:-translate-y-0.5">
              <GraduationCap size={18} />
              <span>Register Courses</span>
            </button>
          </div>

        </div>
      </div>

      {/* --- 2. SUBJECT SCROLLER (Dynamic Navbar) --- */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {loading ? (
            <div className="flex gap-3 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          ) : (
            <div ref={scrollRef} className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {subjects.map((subj) => {
                const isActive = active?._id === subj._id;

                return (
                  <button
                    key={subj._id}
                    id={`subj-${subj._id}`}
                    onClick={() => onSelect(subj)}
                    className="relative px-5 py-2.5 rounded-full whitespace-nowrap transition-all outline-none"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-emerald-600 rounded-full shadow-md shadow-emerald-200"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <div
                      className={`relative z-10 flex items-center gap-2 text-sm font-bold ${
                        isActive ? "text-white" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {getIconForSubject(subj.title)}
                      {subj.title}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default DynamicNavbar;