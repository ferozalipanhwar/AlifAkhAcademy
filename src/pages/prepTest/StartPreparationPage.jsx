import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  BrainCircuit,
  Clock,
  Play,
  Sparkles,
  Target
} from "lucide-react";
import { useState } from "react";
import StartPreparationNavbar from "./StartPreparationNavbar";

// --- Mock Data Generator for UI Visualization ---
const getSubjectTopics = (subjectId) => [
  { id: 1, title: "Fundamentals & Basics", questions: 45, time: "30m" },
  { id: 2, title: "Intermediate Concepts", questions: 30, time: "25m" },
  { id: 3, title: "Advanced Problem Solving", questions: 50, time: "45m" },
  { id: 4, title: "Past Paper Questions (2020-2023)", questions: 120, time: "2h" },
];

// --- 1. The Subject Dashboard Component ---
const SubjectDashboard = ({ subject }) => {
  const topics = getSubjectTopics(subject.id);

  return (
    <motion.div
      key={subject.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-20"
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
           <BrainCircuit size={200} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
              General Preparation
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{subject.title}</h1>
          
          {/* Quick Stats Row */}
          <div className="flex flex-wrap gap-6 text-emerald-50 text-sm font-medium">
             <div className="flex items-center gap-2">
               <BookOpen size={18} /> 4 Modules
             </div>
             <div className="flex items-center gap-2">
               <Target size={18} /> 245+ MCQs
             </div>
             <div className="flex items-center gap-2">
               <Clock size={18} /> ~4 Hours Content
             </div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Available Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((topic, idx) => (
            <div 
              key={topic.id}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                 <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm">
                   0{idx + 1}
                 </div>
                 <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                   {topic.time}
                 </span>
              </div>
              
              <h4 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-emerald-700 transition-colors">
                {topic.title}
              </h4>
              <p className="text-sm text-gray-500 mb-4">{topic.questions} Questions</p>
              
              <button className="w-full py-2.5 rounded-xl bg-gray-50 text-gray-700 font-semibold group-hover:bg-emerald-600 group-hover:text-white transition-all flex items-center justify-center gap-2 text-sm">
                 Start Practice <Play size={16} className="fill-current" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- 2. The Empty State Component ---
const EmptyState = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
  >
    <div className="w-24 h-24 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
      <Sparkles className="text-emerald-500" size={48} />
    </div>
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
      Ready to start learning?
    </h2>
    <p className="text-gray-500 max-w-md text-lg leading-relaxed mb-8">
      Select a subject from the navigation bar above to access MCQs, chapters, and preparation materials.
    </p>
    
    <div className="flex items-center gap-2 text-sm text-gray-400 font-medium animate-pulse">
       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
       Select a subject to begin
    </div>
  </motion.div>
);

// --- 3. Main Page Layout ---
const StartPreparationPage = () => {
  const [activeSubject, setActiveSubject] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Navigation */}
      <StartPreparationNavbar active={activeSubject} onSelect={setActiveSubject} />

      {/* Main Content Area */}
      <div className="flex-1 max-w-5xl mx-auto w-full mt-6 px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {activeSubject ? (
            <SubjectDashboard key={activeSubject.id} subject={activeSubject} />
          ) : (
            <EmptyState key="empty" />
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default StartPreparationPage;