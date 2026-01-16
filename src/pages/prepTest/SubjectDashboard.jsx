import { BookOpen, ChevronLeft, ChevronRight, Filter, Hash, Layers } from "lucide-react"; // Import Icons
import { useEffect, useState } from "react";
import API from "../../apiHelper/api.js";
import McqCard from "../../components/UniversalComponents/McqCard.jsx"; // Adjust path if needed

const SubjectDashboard = ({ subject }) => {
  const [activeTab, setActiveTab] = useState("latest"); 
  const [topics, setTopics] = useState([]);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null); 
  
  // --- PAGINATION STATE ---
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 1. Fetch Data on Subject Change
  useEffect(() => {
    const fetchData = async () => {
      if (!subject || !subject._id) return; 

      setLoading(true);
      try {
        // Fetch Topics
        const topicRes = await API.get(`/prep/topics/${subject._id}`); 
        setTopics(topicRes.data);

        // Fetch MCQs (Reset to Page 1)
        setPage(1);
        await fetchMcqs(1, null);
      } catch (err) {
        console.error("Failed data load", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setSelectedTopic(null); 
  }, [subject]);

  // 2. Fetch MCQs (Updated for Pagination)
  const fetchMcqs = async (pageNum, topicId = null) => {
    if (!subject || !subject._id) return;

    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on change

    try {
      const tId = topicId || selectedTopic?._id; // Use passed ID or state ID
      
      // Build URL with Pagination
      let url = `/prep/mcqs?subjectId=${subject._id}&page=${pageNum}&limit=20`;
      if (tId) url += `&topicId=${tId}`;
      
      const res = await API.get(url);
      
      setMcqs(res.data.mcqs);
      setTotalPages(res.data.pages); // Backend sends total pages
      setPage(pageNum); // Update current page state

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Topic Click (Reset to Page 1)
  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setActiveTab("latest"); 
    setPage(1); // Reset page
    fetchMcqs(1, topic._id); 
  };

  // 4. Handle Tab Switch
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === "latest") {
      setSelectedTopic(null);
      setPage(1);
      fetchMcqs(1, null);
    }
  };

  // 5. Pagination Handlers
  const handleNextPage = () => {
    if (page < totalPages) fetchMcqs(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) fetchMcqs(page - 1);
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase">
               {subject.title}
             </span>
             {selectedTopic && (
               <>
                 <span className="text-gray-300">/</span>
                 <span className="text-gray-600 font-semibold text-sm">{selectedTopic.title}</span>
               </>
             )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {selectedTopic ? selectedTopic.title + " MCQs" : `Latest ${subject.title} MCQs`}
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => handleTabSwitch("latest")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "latest" && !selectedTopic ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Layers size={16} /> Latest Feed
          </button>
          <button
            onClick={() => handleTabSwitch("topics")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "topics" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Hash size={16} /> Topics / Chapters
          </button>
        </div>
      </div>

      {/* Topics Grid */}
      {activeTab === "topics" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <div 
              key={topic._id} 
              onClick={() => handleTopicClick(topic)}
              className="bg-white p-5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all group"
            >
              <h3 className="font-bold text-gray-800 group-hover:text-emerald-600 mb-2">{topic.title}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <BookOpen size={14} /> {topic.mcqCount || 0} Questions
              </div>
            </div>
          ))}
          {topics.length === 0 && <p className="text-gray-500 col-span-3 text-center">No topics found.</p>}
        </div>
      )}

      {/* MCQ Feed */}
      {activeTab === "latest" && (
        <div className="space-y-4 max-w-4xl mx-auto">
          {loading ? (
             <div className="flex justify-center py-10">
               <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : mcqs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No MCQs found here yet.</p>
            </div>
          ) : (
            <>
              {mcqs.map((mcq, index) => (
                <McqCard key={mcq._id} mcq={mcq} index={(page - 1) * 20 + index} />
              ))}

              {/* --- PAGINATION CONTROLS --- */}
              <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-gray-200">
                <button 
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={18} /> Previous
                </button>

                <span className="text-sm font-medium text-gray-600">
                  Page <span className="text-emerald-600 font-bold">{page}</span> of {totalPages}
                </span>

                <button 
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SubjectDashboard;