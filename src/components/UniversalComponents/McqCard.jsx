import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Copy, Eye, Share2, XCircle } from "lucide-react";
import { useState } from "react";

const McqCard = ({ mcq, index }) => {
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (option) => {
    if (selected || showAnswer) return; // Prevent changing after selection
    setSelected(option);
    setShowAnswer(true); // Auto-reveal correct answer on selection
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-4 hover:shadow-md transition-shadow">
      
      {/* Question Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-gray-800 leading-relaxed">
          <span className="text-emerald-600 mr-2">{index + 1}.</span>
          {mcq.question}
        </h3>
        <div className="flex gap-2">
           <button className="text-gray-400 hover:text-blue-500" title="Copy"><Copy size={16}/></button>
           <button className="text-gray-400 hover:text-emerald-500" title="Share"><Share2 size={16}/></button>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {mcq.options.map((option, i) => {
          const isCorrect = option === mcq.correctOption;
          const isSelected = selected === option;
          
          // Determine Style
          let style = "border-gray-200 hover:bg-gray-50 text-gray-600";
          let icon = <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs mr-3">{["A","B","C","D"][i]}</span>;

          if (showAnswer) {
            if (isCorrect) {
              style = "bg-emerald-50 border-emerald-500 text-emerald-800 font-medium";
              icon = <CheckCircle size={20} className="text-emerald-600 mr-3" />;
            } else if (isSelected && !isCorrect) {
              style = "bg-red-50 border-red-500 text-red-800";
              icon = <XCircle size={20} className="text-red-500 mr-3" />;
            } else {
              style = "opacity-60"; // Fade out irrelevant options
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={showAnswer}
              className={`flex items-center px-4 py-3 border rounded-lg text-left transition-all duration-200 ${style}`}
            >
              {icon}
              {option}
            </button>
          );
        })}
      </div>

      {/* Footer / Controls */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <button 
          onClick={() => setShowAnswer(!showAnswer)}
          className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded transition-colors"
        >
          <Eye size={16} /> {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>

        {/* Explanation Toggle */}
        {showAnswer && mcq.explanation && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="w-full mt-3 bg-blue-50 p-3 rounded text-sm text-blue-800"
          >
            <strong>Explanation:</strong> {mcq.explanation}
          </motion.div>
        )}
      </div>
      
      {/* Correct Answer Text (Visible only when Show Answer is clicked) */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="mt-3 p-3 bg-gray-50 border-l-4 border-emerald-500 rounded text-sm"
          >
            <p className="text-gray-700">Correct Answer: <span className="font-bold text-emerald-700">{mcq.correctOption}</span></p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default McqCard;