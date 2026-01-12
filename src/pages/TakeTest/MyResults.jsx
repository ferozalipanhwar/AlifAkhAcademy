import { useEffect, useState } from "react";
import { FaCalendarAlt, FaChartLine, FaDownload, FaTrophy } from "react-icons/fa";
import API from "../../apiHelper/api.js";
import Certificate from "./Certificate";

const MyResults = () => {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/tests/my-results")
      .then((res) => {
        // Filter only passed tests for certificate eligibility
        setResults(res.data.filter((r) => r.status === "PASS" || r.status === "Pass"));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Achievements</h1>
          <p className="text-gray-500 mt-1">Track your progress and download certificates.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-48 bg-gray-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((r) => (
            <div
              key={r._id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Header with Color Strip */}
              <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                    <FaTrophy size={20} />
                  </div>
                  <span className="text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">
                    {r.grade} GRADE
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                  {r.testId?.title || "Test Title"}
                </h3>
                
                <div className="flex items-center text-xs text-gray-400 mb-6 gap-2">
                  <FaCalendarAlt size={10} />
                  {new Date(r.createdAt).toLocaleDateString()}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-3 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Score</p>
                    <p className="text-lg font-bold text-gray-800">
                      {r.score}<span className="text-xs text-gray-400">/{r.totalMarks}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Percentage</p>
                    <p className="text-lg font-bold text-green-600">{r.percentage}%</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(r)}
                  className="w-full py-2.5 bg-gray-900 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <FaDownload size={12} /> View Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <FaChartLine size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No Certificates Yet</h3>
          <p className="text-gray-500 text-sm mt-1">Complete a test with passing marks to earn one.</p>
        </div>
      )}

      {selected && (
        <Certificate result={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default MyResults;