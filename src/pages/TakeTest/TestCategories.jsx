import { useEffect, useState } from "react";
import { FaArrowRight, FaClipboardList, FaClock } from "react-icons/fa";
import API from "../../apiHelper/api.js";

const TestCategories = ({ onStart }) => {
  const [categories, setCategories] = useState([]);
  const [tests, setTests] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/tests/categories").then((res) => {
      setCategories(res.data);
      if (res.data.length) {
        setActiveCategory(res.data[0]._id);
        loadTests(res.data[0]._id);
      }
    });
  }, []);

  const loadTests = async (id) => {
    setActiveCategory(id);
    setLoading(true);
    const res = await API.get(`/tests/category/${id}`);
    setTests(res.data);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Skill Assessment</h1>
        <p className="text-gray-500">Select a category and challenge yourself.</p>
      </div>

      {/* Categories Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => loadTests(cat._id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap
                ${
                  activeCategory === cat._id
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map((n) => (
            <div key={n} className="h-40 bg-gray-200 rounded-2xl animate-pulse"></div>
          ))
        ) : tests.length > 0 ? (
          tests.map((test) => (
            <div
              key={test._id}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <FaClipboardList size={24} />
                </div>
                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                  {test.questionsCount || "20"} Qs
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {test.title}
              </h3>
              
              <div className="flex items-center text-gray-500 text-sm mb-6 space-x-4">
                <span className="flex items-center gap-1">
                  <FaClock className="text-gray-400" /> {test.duration} min
                </span>
                <span className="flex items-center gap-1">
                  Pass: <span className="font-medium text-gray-700">{test.passMarks}%</span>
                </span>
              </div>

              <button
                onClick={() => onStart(test)}
                className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                Start Test <FaArrowRight size={14} />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-400">
            No tests found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCategories;