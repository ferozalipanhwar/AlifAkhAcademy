import { Trash2 } from "lucide-react";
import { useState } from "react";
import API from "../../../apiHelper/api.js";

const TopicTab = ({ subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "" });

  const fetchTopics = async (subjId) => {
    const res = await API.get(`/prep/topics/${subjId}`);
    setTopics(res.data);
  };

  const handleSubjectChange = (e) => {
    const s = subjects.find(sub => sub._id === e.target.value);
    setSelectedSubject(s);
    if (s) fetchTopics(s._id);
    else setTopics([]);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!selectedSubject) return alert("Select a subject first");
    await API.post("/prep/topic", { ...form, subjectId: selectedSubject._id });
    setForm({ title: "", slug: "" });
    fetchTopics(selectedSubject._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete topic?")) return;
    await API.delete(`/prep/topic/${id}`);
    fetchTopics(selectedSubject._id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-in fade-in">

      {/* Subject Selector */}
      <div className="lg:col-span-3">
        <select
          className="input-dark w-full sm:w-2/3 lg:w-1/3"
          onChange={handleSubjectChange}
        >
          <option value="">-- Select Subject First --</option>
          {subjects.map(s => (
            <option key={s._id} value={s._id}>{s.title}</option>
          ))}
        </select>
      </div>

      {selectedSubject && (
        <>
          {/* Add Form */}
          <div className="bg-[#1a1d21] p-4 sm:p-6 rounded-xl border border-white/5 h-fit">
            <h3 className="font-bold mb-4 text-sm sm:text-base">
              Add Topic to <span className="text-emerald-400">{selectedSubject.title}</span>
            </h3>

            <form onSubmit={handleAdd} className="space-y-3">
              <input
                placeholder="Topic Title"
                className="input-dark w-full"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />

              <input
                placeholder="Slug (e.g. 1947-history)"
                className="input-dark w-full"
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
              />

              <button className="w-full btn-primary py-2.5 rounded-lg">
                Add Topic
              </button>
            </form>
          </div>

          {/* Topics List */}
          <div className="lg:col-span-2 space-y-2 max-h-[450px] sm:max-h-[600px] overflow-y-auto custom-scrollbar">
            {topics.map(t => (
              <div
                key={t._id}
                className="bg-[#1a1d21] p-3 sm:p-4 rounded-xl border border-white/5
                           flex justify-between items-center gap-3"
              >
                <span className="text-sm sm:text-base break-words">
                  {t.title}
                </span>

                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            {topics.length === 0 && (
              <p className="text-gray-500 text-sm text-center mt-4">
                No topics yet for this subject.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TopicTab;
