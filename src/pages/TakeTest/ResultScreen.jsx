import { FaCertificate, FaCheckCircle, FaRedo, FaTimesCircle } from "react-icons/fa";

const ResultScreen = ({ result }) => {
  const isPassed = result.status === "PASS";
  console.log(result.status);
  

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-100 overflow-hidden text-center relative">
        
        {/* Top Decoration */}
        <div className={`h-32 ${isPassed ? 'bg-green-600' : 'bg-red-500'} flex items-center justify-center`}>
          <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
            {isPassed ? <FaCheckCircle className="text-white text-5xl" /> : <FaTimesCircle className="text-white text-5xl" />}
          </div>
        </div>

        <div className="px-8 py-8 -mt-10 relative">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {isPassed ? "Congratulations!" : "Keep Practicing"}
            </h2>
            <p className={`text-lg font-bold tracking-wide mb-6 ${isPassed ? "text-green-600" : "text-red-500"}`}>
              {isPassed ? "YOU PASSED" : "YOU FAILED"}
            </p>

            <div className="grid grid-cols-2 gap-4 text-left bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="text-xs text-gray-500 uppercase">Score</p>
                <p className="text-xl font-bold text-gray-800">{result.score}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Status</p>
                <p className={`text-xl font-bold ${isPassed ? 'text-green-600' : 'text-red-500'}`}>
                  {result.status}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {isPassed && (
              <a
                href="/view-certificate"
                className="block w-full py-3 bg-green-600 text-white rounded-xl font-semibold shadow-lg hover:bg-green-700 hover:shadow-green-200 transition flex items-center justify-center gap-2"
              >
                <FaCertificate /> Download Certificate
              </a>
            )}
            
            <a
              href="/take-test"
              className="block w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <FaRedo /> Try Another Test
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;