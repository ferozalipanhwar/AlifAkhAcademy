import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle,
  FileSpreadsheet,
  FileText,
  Loader2,
  Search,
  Trophy,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import API from "../../../../apiHelper/api";
import Certificate from "../../../../pages/TakeTest/Certificate";

const AttemptTest = () => {
  const [attempts, setAttempts] = useState([]);
  const [filteredAttempts, setFilteredAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // For Certificate Modal
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Stats
  const [stats, setStats] = useState({ total: 0, passed: 0, failed: 0 });

  // 1. Fetch Data
  const fetchAttempts = async () => {
    try {
      const res = await API.get("/tests/attempt-tests"); 
      const data = res.data;
      setAttempts(data);
      setFilteredAttempts(data);
      calculateStats(data);
    } catch (err) {
      console.error("Failed to load results", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAttempts(); }, []);

  // 2. Stats Calculation
  const calculateStats = (data) => {
    const total = data.length;
    const passed = data.filter(a => a.status === "PASS" || a.status === "Pass").length;
    setStats({ total, passed, failed: total - passed });
  };

  // 3. Search Logic
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = attempts.filter(item => 
      (item.userId?.name || "").toLowerCase().includes(lowerSearch) ||
      (item.userId?.email || "").toLowerCase().includes(lowerSearch) ||
      (item.testId?.title || "").toLowerCase().includes(lowerSearch)
    );
    setFilteredAttempts(filtered);
  }, [searchTerm, attempts]);

  // 4. 🚀 Professional Export Function (Excel & CSV)
  const handleExport = (type) => {
    // A. Prepare Data with Custom Formatting
    const tableData = filteredAttempts.map(a => ({
      "Student Name": a.userId?.name || "N/A",
      "Email": a.userId?.email || "N/A",
      "Test Title": a.testId?.title || "N/A",
      "Score": a.score,
      "Total Marks": a.totalMarks,
      "Percentage": `${((a.score / a.totalMarks) * 100).toFixed(2)}%`,
      "Status": a.status,
      "Attempt Date": new Date(a.attemptedAt).toLocaleDateString(),
      "Certificate ID": a._id // Useful for tracking
    }));

    // B. Create Worksheet
    const ws = XLSX.utils.json_to_sheet([]);

    // C. Add Custom Header "Alif Akh Academy"
    XLSX.utils.sheet_add_aoa(ws, [
      ["ALIF AKH ACADEMY - STUDENT RESULTS REPORT"], // Row 1: Brand Name
      [`Generated on: ${new Date().toLocaleString()}`], // Row 2: Date
      [""] // Row 3: Empty space
    ], { origin: "A1" });

    // D. Append the actual data starting from Row 4
    XLSX.utils.sheet_add_json(ws, tableData, { origin: "A4", skipHeader: false });

    // E. Create Workbook and Export
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");

    // F. Download File based on type
    if (type === 'excel') {
      XLSX.writeFile(wb, "AlifAkh_Results.xlsx");
    } else {
      XLSX.writeFile(wb, "AlifAkh_Results.csv", { bookType: "csv" });
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#0f1115] min-h-screen text-white">
      
      {/* Header & Export Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="text-emerald-500" /> All Student Results
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage attempts and generate certificates.</p>
        </div>
        
        <div className="flex gap-2">
          {/* CSV Export */}
          <button 
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2 bg-[#1a1d21] hover:bg-[#25282e] text-gray-200 px-4 py-2 rounded-lg text-sm font-medium border border-gray-700 transition-all"
          >
            <FileText size={16} className="text-blue-400" /> CSV
          </button>
          
          {/* Excel Export */}
          <button 
            onClick={() => handleExport('excel')}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-emerald-900/20"
          >
            <FileSpreadsheet size={16} /> Excel Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <StatsCard label="Total Attempts" value={stats.total} color="bg-blue-500" />
         <StatsCard label="Passed" value={stats.passed} color="bg-emerald-500" />
         <StatsCard label="Failed" value={stats.failed} color="bg-red-500" />
      </div>

      {/* Search Bar */}
      <div className="bg-[#1a1d21] p-2 rounded-xl border border-white/5 flex items-center gap-3">
        <Search className="text-gray-500 ml-2" size={20} />
        <input 
          type="text" 
          placeholder="Search by student name, email, or test title..." 
          className="bg-transparent w-full p-2 outline-none text-gray-200 placeholder-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-500" size={40}/></div>
      ) : filteredAttempts.length === 0 ? (
        <div className="text-center py-20 bg-[#1a1d21] rounded-2xl border border-white/5">
           <FileText className="mx-auto text-gray-600 mb-2" size={40}/>
           <p className="text-gray-500">No records found.</p>
        </div>
      ) : (
        <div className="bg-[#1a1d21] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#13161a] text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                  <th className="p-4 font-medium">Student</th>
                  <th className="p-4 font-medium">Test</th>
                  <th className="p-4 font-medium">Marks</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Action</th> {/* 👈 New Column */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-sm">
                {filteredAttempts.map((attempt, index) => (
                  <motion.tr 
                    key={attempt._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    {/* Student */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-emerald-500 font-bold border border-gray-700">
                          {attempt.userId?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{attempt.userId?.name}</p>
                          <p className="text-xs text-gray-500">{attempt.userId?.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Test Info */}
                    <td className="p-4 text-gray-300">{attempt.testId?.title}</td>

                    {/* Performance */}
                    <td className="p-4">
                      <span className="font-bold text-white">{attempt.score}/{attempt.totalMarks}</span>
                      <span className="text-xs text-gray-500 ml-2">({((attempt.score / attempt.totalMarks) * 100).toFixed(0)}%)</span>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      {attempt.status === "PASS" || attempt.status === "Pass" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle size={12} /> PASS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                          <XCircle size={12} /> FAIL
                        </span>
                      )}
                    </td>

                    {/* Actions (Certificate) */}
                    <td className="p-4">
                      {(attempt.status === "PASS" || attempt.status === "Pass") && (
                        <button 
                          onClick={() => setSelectedCertificate(attempt)}
                          className="flex items-center gap-1 text-xs bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 px-3 py-1.5 rounded-lg transition-colors border border-yellow-500/20"
                        >
                          <Trophy size={12} /> Certificate
                        </button>
                      )}
                    </td>

                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🎓 Certificate Modal (Reusing your existing component) */}
      {selectedCertificate && (
        <Certificate 
          result={selectedCertificate} 
          onClose={() => setSelectedCertificate(null)} 
        />
      )}

    </div>
  );
};

const StatsCard = ({ label, value, color }) => (
  <div className="bg-[#1a1d21] border border-white/5 p-4 rounded-xl flex items-center justify-between">
    <div>
      <p className="text-gray-400 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
    <div className={`w-2 h-10 rounded-full ${color}`}></div>
  </div>
);

export default AttemptTest;