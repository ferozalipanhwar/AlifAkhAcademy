import { motion } from "framer-motion";
import { Atom, Book, Calculator, Dna, FlaskConical, Globe, Laptop } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import API from "../../apiHelper/api.js";

// Helper to pick icons based on subject title (optional visual flair)
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
  }, []); // Run once on mount

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
    <div className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {loading ? (
          <div className="flex gap-3 overflow-hidden">
            {[1,2,3,4].map(i => <div key={i} className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />)}
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
                  
                  <div className={`relative z-10 flex items-center gap-2 text-sm font-bold ${isActive ? "text-white" : "text-gray-600 hover:text-gray-900"}`}>
                    {getIconForSubject(subj.title)}
                    {subj.title}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default DynamicNavbar;