import { AlertCircle, CheckCircle, Download, FileJson, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import API from "../../../apiHelper/api.js";

const BulkUploadTakeTestQuestion = ({ testId, onSuccess }) => {
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Parse JSON File
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!Array.isArray(json)) throw new Error("JSON must be an array");
        
        // Basic validation
        const isValid = json.every(item => item.question && item.options && item.correctAnswer);
        if (!isValid) throw new Error("JSON missing required keys");

        setFileData(json);
        setStatus({ type: 'success', msg: `Loaded ${json.length} questions.` });
      } catch (err) {
        setStatus({ type: 'error', msg: "Invalid JSON format." });
        setFileData([]);
      }
    };
    reader.readAsText(file);
  };

  // Upload to Server
  const handleUpload = async () => {
    if (!testId || fileData.length === 0) return;

    setLoading(true);
    try {
      // Assuming your backend route is /admin-tests/questions/bulk or similar
      // Adjust URL based on your actual backend route from previous step
      await API.post("/admin-tests/bulk-upload", {
        testId: testId,
        questions: fileData
      });
      
      setStatus({ type: 'success', msg: "Upload Successful!" });
      setFileData([]);
      if(onSuccess) onSuccess(); // Refresh parent list
    } catch (err) {
      setStatus({ type: 'error', msg: "Upload failed." });
    } finally {
      setLoading(false);
    }
  };

  const downloadSample = () => {
    const sample = [
      {
        "question": "Sample Question?",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A",
        "marks": 1
      }
    ];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sample, null, 2));
    const node = document.createElement('a');
    node.href = dataStr;
    node.download = "sample_questions.json";
    node.click();
  };

  return (
    <div className="bg-[#1a1d21] border border-white/5 p-6 rounded-2xl h-fit">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-white font-bold flex items-center gap-2">
           <Upload size={18} className="text-emerald-500"/> Bulk Upload
        </h3>
        <button onClick={downloadSample} className="text-xs text-blue-400 flex gap-1 hover:underline">
           <Download size={14}/> Sample
        </button>
      </div>

      <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-colors bg-black/20">
        <input type="file" accept=".json" id="jsonFile" className="hidden" onChange={handleFile} />
        <label htmlFor="jsonFile" className="cursor-pointer flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <FileJson className="text-emerald-500" size={20} />
          </div>
          <span className="text-gray-300 text-sm">Click to upload JSON</span>
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {status && (
          <div className={`text-xs flex items-center gap-2 ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
            {status.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
            {status.msg}
          </div>
        )}

        <button 
          onClick={handleUpload}
          disabled={loading || fileData.length === 0}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-medium flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={18}/> : <Upload size={18} />} 
          Upload Questions
        </button>
      </div>
    </div>
  );
};

export default BulkUploadTakeTestQuestion;