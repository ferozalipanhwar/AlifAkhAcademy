import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  FaAtom,
  FaBookOpen,
  FaCalculator,
  FaDna,
  FaFlask,
  FaGlobeAsia,
  FaLanguage,
  FaLaptopCode
} from "react-icons/fa";

// Cleaned data (Removed duplicates)
const subjects = [
  { id: "english", title: "English", icon: <FaLanguage /> },
  { id: "math", title: "Mathematics", icon: <FaCalculator /> },
  { id: "cs", title: "Computer Science", icon: <FaLaptopCode /> },
  { id: "ps", title: "Pakistan Studies", icon: <FaGlobeAsia /> },
  { id: "physics", title: "Physics", icon: <FaAtom /> },
  { id: "chemistry", title: "Chemistry", icon: <FaFlask /> },
  { id: "biology", title: "Biology", icon: <FaDna /> },
  { id: "islamiat", title: "Islamiat", icon: <FaBookOpen /> },
  { id: "general", title: "General Knowledge", icon: <FaBookOpen /> },
  { id: "current", title: "Current Affairs", icon: <FaBookOpen /> },
  { id: "spsc", title: "SPSC Past Papers", icon: <FaBookOpen /> },
  { id: "nts", title: "NTS Past Papers", icon: <FaBookOpen /> },
  { id: "kppsc", title: "KPPSC Past Papers", icon: <FaBookOpen /> },
];

const StartPreparationNavbar = ({ active, onSelect }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to active item on load
  useEffect(() => {
    if (active && scrollRef.current) {
      const activeElement = document.getElementById(`subject-${active.id}`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [active]);

  return (
    <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100">
      
      <div className="max-w-7xl mx-auto">
        {/* Header Label */}
        <div className="px-5 pt-4 pb-2">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Select Subject
          </h2>
        </div>

        {/* Scroll Container Wrapper with Fade Edges */}
        <div className="relative group">
          
          {/* Left Fade (Visible when scrolling) */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden"></div>
          
          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>

          {/* Scrollable List */}
          <div 
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth px-5 pb-4"
          >
            {subjects.map((subj) => {
              const isActive = active?.id === subj.id;

              return (
                <button
                  key={subj.id}
                  id={`subject-${subj.id}`}
                  onClick={() => onSelect(subj)}
                  className="relative px-4 py-2.5 rounded-full whitespace-nowrap transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                >
                  {/* Active Background Animation */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSubject"
                      className="absolute inset-0 bg-green-600 rounded-full shadow-lg shadow-green-200"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Content */}
                  <div className={`relative z-10 flex items-center gap-2 text-sm font-semibold ${isActive ? "text-white" : "text-gray-600 group-hover:text-gray-900"}`}>
                    <span className={`text-lg transition-transform duration-300 ${isActive ? "scale-110" : "opacity-70"}`}>
                      {subj.icon}
                    </span>
                    {subj.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default StartPreparationNavbar;