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

const subjects = [
  { id: "english", title: "English", icon: <FaLanguage /> },
  { id: "math", title: "Mathematics", icon: <FaCalculator /> },
  { id: "cs", title: "Computer Science", icon: <FaLaptopCode /> },
  { id: "ps", title: "Pakistan Studies", icon: <FaGlobeAsia /> },
  { id: "physics", title: "Physics", icon: <FaAtom /> },
  { id: "chemistry", title: "Chemistry", icon: <FaFlask /> },
  { id: "biology", title: "Biology", icon: <FaDna /> },
  { id: "islamiat", title: "Islamiat", icon: <FaBookOpen /> },
    { id: "chemistry", title: "Chemistry", icon: <FaFlask /> },
  { id: "biology", title: "Biology", icon: <FaDna /> },
  { id: "islamiat", title: "Islamiat", icon: <FaBookOpen /> },
];

const StartPreparationNavbar = ({ active, onSelect }) => {
  return (
    <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-1">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
          Select Subject
        </h2>
      </div>

      {/* Scrollable Container */}
      <div className="max-w-7xl mx-auto px-4 pb-3">
        {/* 'no-scrollbar' class is used to hide the scrollbar visually */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-1">
          {subjects.map((subj) => {
            const isActive = active?.id === subj.id;
            
            return (
              <button
                key={subj.id}
                onClick={() => onSelect(subj)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap font-medium text-sm transition-all duration-300 ease-in-out border
                  ${
                    isActive
                      ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-200 scale-105"
                      : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-green-50 hover:border-green-200 hover:text-green-700"
                  }
                `}
              >
                <span className={`text-lg ${isActive ? "text-white" : "text-green-600"}`}>
                  {subj.icon}
                </span>
                {subj.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* CSS to hide scrollbar but keep functionality */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default StartPreparationNavbar;