import { useEffect, useState } from "react";
import API from "../../apiHelper/api.js";

const MCQTestScreen = ({ test, onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Fetch all questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get(`/tests/start/${test._id}`);
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [test._id]);

  const handleSelect = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async () => {
    const formatted = Object.keys(answers).map(qId => ({
      questionId: qId,
      selectedAnswer: answers[qId],
    }));

    try {
      const res = await API.post("/tests/submit", {
        testId: test._id,
        answers: formatted,
      });
      setSubmitted(true);
      onFinish(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading questions...</p>;
  if (!questions.length) return <p className="text-center mt-10 text-red-500">No questions available</p>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto py-10">
      {/* Question Card */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p className="font-semibold mb-4 text-gray-800">
          Q{currentIndex + 1}. {currentQuestion.question}
        </p>

        <div className="space-y-3">
          {currentQuestion.options.map(opt => {
            // Highlight correct answer green if submitted
            const isCorrect = submitted && opt === currentQuestion.correctAnswer;
            const isSelected = answers[currentQuestion._id] === opt;

            return (
              <button
                key={opt}
                onClick={() => !submitted && handleSelect(currentQuestion._id, opt)}
                className={`
                  w-full text-left px-4 py-2 rounded-lg border transition
                  ${isSelected ? "border-green-600 bg-green-100" : "border-gray-300 hover:border-green-500"}
                  ${isCorrect ? "bg-green-600 text-white border-green-600" : ""}
                `}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Numbering */}
      <div className="flex flex-wrap gap-2 mb-6">
        {questions.map((q, idx) => {
          const isAnswered = answers[q._id] !== undefined;
          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`
                w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium
                ${currentIndex === idx ? "bg-green-600 text-white" : isAnswered ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}
              `}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Submit Test
        </button>
      )}
    </div>
  );
};

export default MCQTestScreen;
