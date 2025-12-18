
import { useState } from "react";

const TestScreen = ({ test, onSubmit }) => {
  const [selected, setSelected] = useState(null);
  const dummyQuestions = [
    { q: `Q1: Sample question for ${test}?`, options: ["Option 1", "Option 2", "Option 3"], answer: 0 },
  ];

  const handleSubmit = () => {
    const randomScore = Math.floor(Math.random() * 100);
    onSubmit(randomScore);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">📘 {test} Test</h2>
      {dummyQuestions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="mb-2">{q.q}</p>
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`w-full text-left p-3 rounded-lg border mb-2 transition ${
                selected === idx ? "bg-blue-600 border-blue-400" : "bg-gray-700 border-gray-600 hover:bg-gray-600"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="mt-6 w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold">
        Submit Test
      </button>
    </div>
  );
};

export default TestScreen;