import { BookOpen, FileText, Layers, List, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api.js";

import McqTab from "../prepComponent/McqTab.jsx";
import SubjectTab from "../prepComponent/SubjectTab.jsx";
import TopicTab from "../prepComponent/TopicTab.jsx";
import BulkUploadTab from "./BulkUploadTab.jsx";

const ManagePrep = () => {
  const [activeTab, setActiveTab] = useState("subjects"); 
  const [subjects, setSubjects] = useState([]);

  useEffect(() => { fetchSubjects(); }, []);

  const fetchSubjects = async () => {
    try {
      const res = await API.get("/prep/subjects");
      setSubjects(res.data);
    } catch (err) {
      console.error("Failed to load subjects");
    }
  };

  return (
    <div className="space-y-6 text-white px-3 sm:px-4 md:px-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <BookOpen className="text-emerald-500" size={22} />
            Prep Material Manager
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Manage subjects, topics, and question banks.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex flex-wrap sm:flex-nowrap gap-1 bg-[#1a1d21] p-1.5 rounded-xl border border-white/10 min-w-full sm:min-w-fit">
          <TabButton label="Subjects" id="subjects" icon={<Layers size={16} />} active={activeTab} set={setActiveTab} />
          <TabButton label="Topics" id="topics" icon={<List size={16} />} active={activeTab} set={setActiveTab} />
          <TabButton label="MCQs" id="mcqs" icon={<FileText size={16} />} active={activeTab} set={setActiveTab} />
          <TabButton label="Bulk Upload" id="bulk" icon={<UploadCloud size={16} />} active={activeTab} set={setActiveTab} />
        </div>
      </div>

      {/* Content */}
      <div className="pt-2 animate-in fade-in duration-300">
        {activeTab === "subjects" && <SubjectTab subjects={subjects} fetchSubjects={fetchSubjects} />}
        {activeTab === "topics" && <TopicTab subjects={subjects} />}
        {activeTab === "mcqs" && <McqTab subjects={subjects} />}
        {activeTab === "bulk" && <BulkUploadTab subjects={subjects} />}
      </div>

      <style>{`
        .input-dark {
          @apply bg-black/20 border border-white/10 text-white p-3 rounded-xl outline-none
          focus:border-emerald-500 transition-all text-sm w-full;
        }

        .btn-primary {
          @apply bg-emerald-600 hover:bg-emerald-700 text-white font-medium
          transition-colors rounded-xl px-4 py-2;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
};

const TabButton = ({ label, id, active, set, icon }) => (
  <button
    onClick={() => set(id)}
    className={`flex flex-1 sm:flex-none items-center justify-center gap-2
      px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-medium
      transition-all whitespace-nowrap
      ${
        active === id
          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
  >
    {icon}
    {label}
  </button>
);

export default ManagePrep;
