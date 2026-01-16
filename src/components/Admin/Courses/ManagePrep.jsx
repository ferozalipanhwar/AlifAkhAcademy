import { BookOpen } from "lucide-react"; // Import Upload icon
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api.js";

// Import sub-components
import McqTab from "../prepComponent/McqTab.jsx";
import SubjectTab from "../prepComponent/SubjectTab.jsx";
import TopicTab from "../prepComponent/TopicTab.jsx";
import BulkUploadTab from "./BulkUploadTab.jsx"; // 👈 Import New Component

const ManagePrep = () => {
  const [activeTab, setActiveTab] = useState("subjects"); 
  const [subjects, setSubjects] = useState([]);

  useEffect(() => { fetchSubjects(); }, []);

  const fetchSubjects = async () => {
    try {
      const res = await API.get("/prep/subjects");
      setSubjects(res.data);
    } catch (err) { console.error("Failed to load subjects"); }
  };

  return (
    <div className="space-y-6 text-white">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <BookOpen className="text-emerald-500" /> Prep Material Manager
      </h1>

      {/* Tabs */}
      <div className="flex bg-[#1a1d21] p-1 rounded-lg w-fit border border-white/10">
        <TabButton label="Subjects" id="subjects" active={activeTab} set={setActiveTab} />
        <TabButton label="Topics" id="topics" active={activeTab} set={setActiveTab} />
        <TabButton label="MCQs" id="mcqs" active={activeTab} set={setActiveTab} />
        <TabButton label="Bulk Upload" id="bulk" active={activeTab} set={setActiveTab} /> {/* 👈 New Tab */}
      </div>

      <div className="pt-4">
        {activeTab === "subjects" && <SubjectTab subjects={subjects} fetchSubjects={fetchSubjects} />}
        {activeTab === "topics" && <TopicTab subjects={subjects} />}
        {activeTab === "mcqs" && <McqTab subjects={subjects} />}
        {activeTab === "bulk" && <BulkUploadTab subjects={subjects} />} {/* 👈 Render Component */}
      </div>

      <style>{`
        .input-dark { @apply bg-black/20 border border-white/10 text-white p-2 rounded outline-none focus:border-emerald-500 transition-all text-sm; }
        .btn-primary { @apply bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors; }
      `}</style>
    </div>
  );
};

// ... TabButton helper remains same ...
const TabButton = ({ label, id, active, set }) => (
  <button
    onClick={() => set(id)}
    className={`px-4 py-2 rounded-md text-sm transition-all ${
      active === id ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
    }`}
  >
    {label}
  </button>
);

export default ManagePrep;