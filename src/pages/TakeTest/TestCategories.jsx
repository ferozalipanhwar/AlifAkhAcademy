
import { FaBook, FaBrain, FaCode } from "react-icons/fa";

const categories = [
  { title: "Coding Tests", icon: <FaCode />, tests: ["HTML", "CSS", "JavaScript", "Java", "Python"] },
  { title: "Competitive Exams", icon: <FaBrain />, tests: ["General Knowledge", "IQ Test", "Aptitude", "Entry Test"] },
  { title: "Academic", icon: <FaBook />, tests: ["Matric", "Intermediate", "Graduation"] },
];

const TestCategories = ({ onSelectTest }) => (
  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {categories.map((cat, i) => (
      <div key={i} className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="text-4xl mb-4 text-blue-400">{cat.icon}</div>
        <h2 className="text-xl font-semibold mb-3">{cat.title}</h2>
        {cat.tests.map((test, idx) => (
          <button
            key={idx}
            onClick={() => onSelectTest(test)}
            className="block w-full text-left px-4 py-2 mb-2 bg-gray-700 rounded hover:bg-blue-600 transition"
          >
            {test}
          </button>
        ))}
      </div>
    ))}
  </div>
);

export default TestCategories;