import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  Menu,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../apiHelper/api.js";

const MCQTestScreen = ({ test, onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get(`/tests/start/${test._id}`);
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [test._id]);

  const handleSelect = (qId, option) => {
    if (submitted) return; // Prevent changes after submit
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const formatted = Object.keys(answers).map((qId) => ({
      questionId: qId,
      selectedAnswer: answers[qId],
    }));

    try {
      const res = await API.post("/tests/submit", {
        testId: test._id,
        answers: formatted,
      });
      setSubmitted(true);
      // Optional: Wait a bit before navigating away so they can see the result
      if (onFinish) onFinish(res.data);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    }
  };

  // --- Loading & Error States ---
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Preparing your test...</p>
      </div>
    );
  }

  if (!questions.length || error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="bg-red-50 p-4 rounded-full text-red-500 mb-4">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Unable to load test</h3>
        <p className="text-gray-500 mt-2">{error || "No questions found for this module."}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* === Header Section === */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {test.title || "Assessment Test"}
            </h1>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <Clock size={14} /> Duration: {test.duration || "30 mins"}
            </p>
          </div>
          <div className="text-right">
             <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
               {currentIndex + 1} / {questions.length}
             </span>
          </div>
        </div>

        {/* === Progress Bar === */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* === Main Question Card === */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-gray-800 leading-relaxed mb-6">
                    <span className="text-emerald-500 mr-2">Q{currentIndex + 1}.</span>
                    {currentQuestion.question}
                  </h2>

                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, idx) => {
                      const isSelected = answers[currentQuestion._id] === opt;
                      const isCorrect = submitted && opt === currentQuestion.correctAnswer;
                      const isWrong = submitted && isSelected && opt !== currentQuestion.correctAnswer;
                      
                      // Dynamic styles based on state
                      let borderClass = "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50";
                      let bgClass = "bg-white";
                      let icon = <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs text-gray-400 font-medium">{["A","B","C","D"][idx]}</div>;

                      if (isSelected && !submitted) {
                        borderClass = "border-emerald-500 ring-1 ring-emerald-500";
                        bgClass = "bg-emerald-50";
                        icon = <CheckCircle className="text-emerald-500" size={20} />;
                      }

                      if (submitted) {
                         if (isCorrect) {
                            borderClass = "border-green-500 bg-green-50";
                            icon = <Check className="text-green-600" size={20} />;
                         } else if (isWrong) {
                            borderClass = "border-red-300 bg-red-50";
                            icon = <X className="text-red-500" size={20} />;
                         } else {
                            borderClass = "border-gray-100 opacity-60";
                         }
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelect(currentQuestion._id, opt)}
                          disabled={submitted}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group ${borderClass} ${bgClass}`}
                        >
                          <div className="shrink-0">{icon}</div>
                          <span className={`font-medium ${submitted && isCorrect ? "text-green-800" : "text-gray-700"}`}>
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Footer Navigation within Card */}
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft size={18} /> Previous
                  </button>

                  {!submitted ? (
                     isLastQuestion ? (
                      <button
                        onClick={handleSubmit}
                        className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 transition-all flex items-center gap-2"
                      >
                        Submit Test <CheckCircle size={18} />
                      </button>
                     ) : (
                      <button
                        onClick={handleNext}
                        className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-gray-800 hover:gap-3 transition-all flex items-center gap-2"
                      >
                        Next Question <ArrowRight size={18} />
                      </button>
                     )
                  ) : (
                    <div className="text-emerald-600 font-bold flex items-center gap-2">
                      <CheckCircle size={18} /> Test Completed
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* === Sidebar: Question Map === */}
          <div className="lg:col-span-4">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <Menu size={18} className="text-gray-400" /> Question Map
                </h3>
                
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => {
                    const isAnswered = answers[q._id] !== undefined;
                    const isCurrent = currentIndex === idx;
                    
                    // Determine styling based on state
                    let baseStyle = "h-10 w-full rounded-lg text-sm font-bold flex items-center justify-center transition-all";
                    
                    if (isCurrent) {
                      baseStyle += " bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-110 ring-2 ring-emerald-100";
                    } else if (isAnswered) {
                      baseStyle += " bg-emerald-100 text-emerald-700 border border-emerald-200";
                    } else {
                      baseStyle += " bg-gray-50 text-gray-400 border border-gray-100 hover:bg-gray-100";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={baseStyle}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                   <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <div className="w-3 h-3 rounded bg-emerald-600"></div> Current
                      <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200"></div> Answered
                      <div className="w-3 h-3 rounded bg-gray-50 border border-gray-200"></div> Skipped
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MCQTestScreen;