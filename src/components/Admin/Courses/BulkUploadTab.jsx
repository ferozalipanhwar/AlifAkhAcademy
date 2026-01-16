import { AlertCircle, CheckCircle, Download, FileJson, Upload } from "lucide-react";
import { useState } from "react";
import API from "../../../apiHelper/api.js";

const BulkUploadTab = ({ subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', msg: '' }

  // Fetch Topics when Subject changes
  const handleSubjectChange = async (e) => {
    const subjId = e.target.value;
    setSelectedSubject(subjId);
    setTopics([]);
    if (subjId) {
      const res = await API.get(`/prep/topics/${subjId}`);
      setTopics(res.data);
    }
  };

  // Parse JSON File
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!Array.isArray(json)) throw new Error("JSON must be an array");
        setFileData(json);
        setStatus({ type: 'success', msg: `Loaded ${json.length} MCQs ready to upload.` });
      } catch (err) {
        setStatus({ type: 'error', msg: "Invalid JSON format. Please use the sample format." });
        setFileData([]);
      }
    };
    reader.readAsText(file);
  };

  // Upload to Server
  const handleUpload = async () => {
    if (!selectedSubject || fileData.length === 0) {
      return setStatus({ type: 'error', msg: "Select Subject and load a valid JSON file." });
    }

    setLoading(true);
    try {
      await API.post("/prep/mcq/bulk", {
        subjectId: selectedSubject,
        topicId: selectedTopic || null,
        mcqs: fileData
      });
      setStatus({ type: 'success', msg: "Upload Successful! MCQs added to database." });
      setFileData([]);
    } catch (err) {
      setStatus({ type: 'error', msg: "Upload failed. Check server logs." });
    } finally {
      setLoading(false);
    }
  };

  // Download Sample JSON
  const downloadSample = () => {
    const sample = [
      {
        "question": "What is the capital of Pakistan?",
        "options": ["Karachi", "Lahore", "Islamabad", "Quetta"],
        "correctOption": "Islamabad",
        "explanation": "Islamabad became the official capital on August 14, 1967.",
        "difficulty": "Easy"
      },
      {
        "question": "Who wrote the National Anthem?",
        "options": ["Allama Iqbal", "Hafeez Jalandhari", "Faiz Ahmed Faiz", "Chaudhry Rahmat Ali"],
        "correctOption": "Hafeez Jalandhari",
        "difficulty": "Medium"
      }
    ];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sample, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "mcq_sample.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="bg-[#1a1d21] p-8 rounded-xl border border-white/5 max-w-3xl mx-auto animate-in fade-in">
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <Upload className="text-emerald-500" /> Bulk MCQ Upload
          </h2>
          <p className="text-gray-400 text-sm mt-1">Upload a .json file containing multiple MCQs.</p>
        </div>
        <button 
          onClick={downloadSample}
          className="flex items-center gap-2 text-xs bg-blue-500/10 text-blue-400 px-3 py-2 rounded-lg hover:bg-blue-500/20 transition-colors"
        >
          <Download size={14} /> Sample JSON
        </button>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <select className="input-dark" onChange={handleSubjectChange} value={selectedSubject}>
          <option value="">Select Subject (Required)</option>
          {subjects.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
        </select>

        <select className="input-dark" onChange={e => setSelectedTopic(e.target.value)} disabled={!selectedSubject}>
          <option value="">Select Topic (Optional)</option>
          {topics.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}
        </select>
      </div>

      {/* File Input Area */}
      <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-emerald-500/50 transition-colors bg-black/20">
        <input 
          type="file" 
          accept=".json" 
          id="jsonFile" 
          className="hidden" 
          onChange={handleFile}
        />
        <label htmlFor="jsonFile" className="cursor-pointer flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <FileJson className="text-emerald-500" size={24} />
          </div>
          <span className="text-gray-300 font-medium">Click to upload JSON file</span>
          <span className="text-gray-500 text-xs">Format: Array of Objects</span>
        </label>
      </div>

      {/* Status & Action */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm">
          {status && (
            <div className={`flex items-center gap-2 ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
              {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {status.msg}
            </div>
          )}
        </div>

        <button 
          onClick={handleUpload}
          disabled={loading || fileData.length === 0}
          className="btn-primary px-6 py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? "Uploading..." : `Upload ${fileData.length > 0 ? fileData.length : ''} MCQs`}
        </button>
      </div>

    </div>
  );
};

export default BulkUploadTab;