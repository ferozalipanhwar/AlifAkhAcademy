import { useState } from "react";
import { FaCertificate, FaCheckCircle, FaExclamationTriangle, FaSearch } from "react-icons/fa";
import API from "../apiHelper/api"; // Your existing API helper

const VerifyCertificate = () => {
  const [certId, setCertId] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setLoading(true);
    setError(null);
    setVerificationData(null);

    API.get(`/tests/verify-certificate/${certId.trim()}`)
      .then((res) => {
        if (res.data.valid) {
          setVerificationData(res.data.data);
        }
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Invalid Certificate ID or Network Error";
        setError(msg);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full shadow-md inline-block mb-4">
            <FaCertificate className="text-green-700 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Certificate Verification</h1>
          <p className="text-gray-500 mt-2">Enter the Certificate ID to verify authenticity.</p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <form onSubmit={handleVerify} className="relative">
            <input
              type="text"
              placeholder="Paste Certificate ID here..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bg-gray-900 text-white p-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FaSearch />
              )}
            </button>
          </form>
        </div>

        {/* Result: SUCCESS */}
        {verificationData && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
            <div className="bg-green-600 p-4 text-center">
              <FaCheckCircle className="text-white text-5xl mx-auto mb-2" />
              <h2 className="text-white font-bold text-xl">Valid Certificate</h2>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Certified Student</p>
                <h3 className="text-2xl font-bold text-gray-900 font-serif">{verificationData.studentName}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Course / Test</span>
                  <span className="font-semibold text-gray-800 text-right">{verificationData.testTitle}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Issue Date</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(verificationData.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Grade</span>
                  <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 font-bold text-sm">
                    {verificationData.grade}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500">Certificate ID</span>
                  <span className="text-xs font-mono bg-gray-100 p-1 rounded text-gray-600">
                    {verificationData.certificateId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result: ERROR */}
        {error && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-l-4 border-red-500 animate-shake">
            <div className="p-6 flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-full text-red-500 shrink-0">
                <FaExclamationTriangle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Verification Failed</h3>
                <p className="text-red-600 mt-1">{error}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Please check the ID and try again.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default VerifyCertificate;