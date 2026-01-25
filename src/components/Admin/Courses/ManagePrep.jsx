import { AlertCircle, Book, Layers, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api.js";

const TopicTab = ({ subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  // Fetch topics when subject changes
  useEffect(() => {
    if (selectedSubject) fetchTopics();
    else setTopics([]);
  }, [selectedSubject]);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/prep/topics/${selectedSubject}`);
      setTopics(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!newTopic.trim() || !selectedSubject) return;

    setAdding(true);
    try {
      await API.post("/prep/topic", { 
        title: newTopic, 
        subjectId: selectedSubject 
      });
      setNewTopic("");
      fetchTopics(); // Refresh list
    } catch (err) {
      alert("Failed to add topic");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this topic?")) return;
    try {
      await API.delete(`/prep/topic/${id}`);
      setTopics(topics.filter(t => t._id !== id));
    } catch (err) {
      alert("Error deleting topic");
    }
  };

  return (
    <div className="bg-[#1a1d21] border border-white/5 p-4 md:p-6 rounded-2xl animate-in fade-in w-full">
      
      {/* --- Section 1: Controls (Responsive Stack) --- */}
      {/* Use flex-col for mobile, flex-row for tablet/desktop */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 border-b border-white/5 pb-6">
        
        {/* Subject Select */}
        <div className="w-full md:w-1/3">
          <label className="text-xs text-gray-400 mb-1.5 block ml-1 font-medium">Select Subject</label>
          <div className="relative">
            <select 
              className="w-full bg-black/20 border border-white/10 text-white p-3 pl-10 rounded-xl outline-none focus:border-emerald-500 appearance-none transition-all text-sm h-12"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">-- Choose Subject --</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub._id}>{sub.title}</option>
              ))}
            </select>
            <div className="absolute left-3 top-3.5 pointer-events-none text-gray-500">
               <Layers size={18} />
            </div>
          </div>
        </div>

        {/* Add Topic Form */}
        <form onSubmit={handleAddTopic} className="w-full md:w-2/3 flex flex-col sm:flex-row gap-3 items-end">
          <div className="w-full">
            <label className="text-xs text-gray-400 mb-1.5 block ml-1 font-medium">New Topic Title</label>
            <input 
              type="text" 
              placeholder="e.g. Organic Chemistry..." 
              className="w-full bg-black/20 border border-white/10 text-white p-3 rounded-xl outline-none focus:border-emerald-500 transition-all text-sm h-12"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              disabled={!selectedSubject}
            />
          </div>
          <button 
            type="submit" 
            disabled={!selectedSubject || !newTopic || adding}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 h-12 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 min-w-[120px]"
          >
            {adding ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
            <span>Add</span>
          </button>
        </form>
      </div>

      {/* --- Section 2: Topic List (Responsive Grid) --- */}
      <div>
        <h3 className="text-white font-bold mb-4 flex items-center justify-between text-sm md:text-base">
          <span>Existing Topics</span>
          {selectedSubject && (
             <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md border border-emerald-500/20">
                {topics.length} Found
             </span>
          )}
        </h3>

        {!selectedSubject ? (
          <div className="text-center py-12 bg-black/20 rounded-xl border border-dashed border-white/10">
            <Book className="mx-auto text-gray-600 mb-3" size={32}/>
            <p className="text-gray-500 text-sm">Select a subject above to manage topics.</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-emerald-500" size={32} />
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center py-12 bg-black/20 rounded-xl border border-white/5">
            <AlertCircle className="mx-auto text-orange-400/50 mb-3" size={32}/>
            <p className="text-gray-400 text-sm">No topics found. Add one above!</p>
          </div>
        ) : (
          // RESPONSIVE GRID: 1 Col Mobile (grid-cols-1), 2 Col Tablet (sm:grid-cols-2), 3 Col Desktop (lg:grid-cols-3)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topics.map((topic) => (
              <div 
                key={topic._id} 
                className="group flex items-center justify-between p-3.5 bg-black/20 border border-white/5 rounded-xl hover:border-emerald-500/30 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                   <div className="w-9 h-9 rounded-lg bg-[#2a2d31] text-emerald-500 flex items-center justify-center font-bold text-sm shrink-0 border border-white/5">
                      {topic.title.charAt(0).toUpperCase()}
                   </div>
                   <span className="text-gray-200 text-sm font-medium truncate w-full">{topic.title}</span>
                </div>
                
                <button 
                  onClick={() => handleDelete(topic._id)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                  title="Delete Topic"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicTab;