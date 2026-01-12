import { useEffect, useRef, useState } from "react";
import { FaCheck, FaChevronLeft, FaChevronRight, FaClock } from "react-icons/fa";
import API from "../../apiHelper/api.js";

const TestScreen = ({ test, onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(test.duration * 60);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const submitted = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    API.get(`/tests/start/${test._id}`)
      .then((res) => setQuestions(res.data))
      .finally(() => setLoading(false));
  }, [test._id]);

  useEffect(() => {
    if (timeLeft <= 0 && !submitted.current) submitTest();
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const submitTest = async () => {
    if (submitted.current) return;
    submitted.current = true;
    setSubmitting(true);

    const formatted = Object.keys(answers).map((id) => ({
      questionId: id,
      selectedAnswer: answers[id],
    }));

    const res = await API.post("/tests/submit", {
      testId: test._id,
      answers: formatted,
    });

    onFinish(res.data);
  };

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading your test...</div>;
  if (!questions.length) return <div className="text-center mt-20 text-red-500">Error loading questions.</div>;

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const isTimeCritical = timeLeft < 60;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Sticky Header with Progress */}
      <div className="sticky top-0 z-40 bg-gray-50/95 backdrop-blur pb-4 pt-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-700 truncate max-w-md">{test.title}</h2>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-mono font-semibold ${isTimeCritical ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-white text-gray-700 shadow-sm'}`}>
            <FaClock size={14} /> {minutes}:{seconds}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[400px] flex flex-col">
        <div className="mb-6">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-snug">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3 flex-grow">
          {currentQuestion.options.map((opt) => {
            const isSelected = answers[currentQuestion._id] === opt;
            return (
              <div
                key={opt}
                onClick={() => setAnswers({ ...answers, [currentQuestion._id]: opt })}
                className={`
                  relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group
                  ${isSelected 
                    ? "border-green-500 bg-green-50 shadow-inner" 
                    : "border-gray-100 hover:border-green-200 hover:bg-gray-50"
                  }
                `}
              >
                <div className={`
                  w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-colors
                  ${isSelected ? "border-green-500 bg-green-500" : "border-gray-300 group-hover:border-green-400"}
                `}>
                  {isSelected && <FaCheck className="text-white text-xs" />}
                </div>
                <span className={`font-medium ${isSelected ? "text-green-800" : "text-gray-700"}`}>
                  {opt}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:static md:bg-transparent md:border-0 md:mt-6 md:p-0">
        <div className="max-w-3xl mx-auto flex justify-between gap-4">
          <button
            onClick={() => currentIndex > 0 && setCurrentIndex((i) => i - 1)}
            disabled={currentIndex === 0}
            className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-white hover:shadow transition disabled:opacity-50 flex items-center gap-2"
          >
            <FaChevronLeft /> Back
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-green-600 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              Next <FaChevronRight />
            </button>
          ) : (
            <button
              onClick={submitTest}
              disabled={submitting}
              className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 shadow-lg hover:shadow-green-200 transition-all w-full md:w-auto"
            >
              {submitting ? "Processing..." : "Submit Test"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestScreen;