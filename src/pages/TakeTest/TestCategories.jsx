import { useEffect, useState } from "react";
import { FaArrowRight, FaClipboardList, FaClock, FaLayerGroup } from "react-icons/fa";
import API from "../../apiHelper/api.js";
import Navbar from "./Navbar.jsx";

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
    try {
        const res = await API.get(`/tests/category/${id}`);
        setTests(res.data);
    } catch (error) {
        console.error("Error fetching tests", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    // FIX: "w-full" aur "overflow-x-hidden"
    <div className="w-full min-h-screen bg-gray-50 font-sans pb-12 overflow-x-hidden">
      
      {/* 1. NAVBAR - Fixed Position (Code upar hai) */}
      <Navbar />

      {/* 2. MAIN CONTENT - Padding Top "pt-32" ya "pt-40" zaroori hai fixed navbar ke liye */}
      <div className="pt-32 sm:pt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Text */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Skill <span className="text-emerald-600">Assessment</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Select a category below to filter assessments. Challenge yourself and track your progress.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 overflow-x-auto pb-4 max-w-full px-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => loadTests(cat._id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap border
                  ${
                    activeCategory === cat._id
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 transform scale-105"
                      : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600 hover:shadow-md"
                  }`}
              >
                <FaLayerGroup className={activeCategory === cat._id ? "text-emerald-200" : "text-gray-400"} />
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton Loading
            [1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-56 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
                 <div className="flex justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                    <div className="w-16 h-6 bg-gray-200 rounded-md"></div>
                 </div>
                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                 <div className="h-10 bg-gray-200 rounded mt-auto"></div>
              </div>
            ))
          ) : tests.length > 0 ? (
            tests.map((test) => (
              <div
                key={test._id}
                className="group flex flex-col bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                    <FaClipboardList size={22} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md border border-gray-200 group-hover:border-emerald-200 transition-colors">
                    {test.totalMarks || "20"} Qs
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  {test.title}
                </h3>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-6">
                  <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded text-gray-600">
                    <FaClock className="text-emerald-500" /> {test.duration} min
                  </span>
                  <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded text-gray-600">
                    Pass: <span className="text-gray-900 font-bold">{test.passMarks}%</span>
                  </span>
                </div>

                <button
                  onClick={() => onStart(test)}
                  className="mt-auto w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold tracking-wide hover:bg-emerald-600 transition-all shadow-md hover:shadow-emerald-200 flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  Start Assessment <FaArrowRight size={12} className="transition-all" />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="inline-flex p-4 rounded-full bg-gray-50 mb-4 text-gray-400">
                 <FaLayerGroup size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No Tests Found</h3>
              <p className="text-gray-500 text-sm mt-1">There are currently no active tests in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestCategories;