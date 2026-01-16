import { Edit, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import API from "../../../apiHelper/api.js";

const McqTab = ({ subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingMcq, setEditingMcq] = useState(null);

  const [form, setForm] = useState({
    question: "", options: ["", "", "", ""], correctOption: "", difficulty: "Medium", explanation: ""
  });

  /* Fetchers */
  const fetchTopics = async (subjId) => {
    const res = await API.get(`/prep/topics/${subjId}`);
    setTopics(res.data);
  };

  const fetchMcqs = async (subjId, topicId) => {
    setLoading(true);
    const res = await API.get(`/prep/mcqs?subjectId=${subjId}&topicId=${topicId}&limit=100`);
    setMcqs(res.data.mcqs);
    setLoading(false);
  };

  /* Handlers */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, subjectId: selectedSubject._id, topicId: selectedTopic._id };
    
    if (editingMcq) await API.put(`/prep/mcq/${editingMcq}`, payload);
    else await API.post("/prep/mcq", payload);
    
    setForm({ question: "", options: ["", "", "", ""], correctOption: "", difficulty: "Medium", explanation: "" });
    setEditingMcq(null);
    fetchMcqs(selectedSubject._id, selectedTopic._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete MCQ?")) return;
    await API.delete(`/prep/mcq/${id}`);
    fetchMcqs(selectedSubject._id, selectedTopic._id);
  };

  const startEdit = (mcq) => {
    setForm({
      question: mcq.question, options: mcq.options, correctOption: mcq.correctOption,
      difficulty: mcq.difficulty, explanation: mcq.explanation
    });
    setEditingMcq(mcq._id);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Filters */}
      <div className="flex gap-4">
        <select className="input-dark w-1/3" onChange={(e) => {
          const s = subjects.find(sub => sub._id === e.target.value);
          setSelectedSubject(s); setSelectedTopic(null); setMcqs([]);
          if (s) fetchTopics(s._id);
        }}>
          <option value="">Select Subject</option>
          {subjects.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
        </select>

        <select className="input-dark w-1/3" disabled={!selectedSubject} onChange={(e) => {
          const t = topics.find(top => top._id === e.target.value);
          setSelectedTopic(t);
          if (selectedSubject && t) fetchMcqs(selectedSubject._id, t._id);
        }}>
          <option value="">Select Topic</option>
          {topics.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}
        </select>
      </div>

      {selectedTopic && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add/Edit Form */}
          <div className="bg-[#1a1d21] p-6 rounded-xl border border-white/5 h-fit">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">{editingMcq ? "Edit MCQ" : "Add New MCQ"}</h3>
              {editingMcq && <button onClick={() => { setEditingMcq(null); setForm({ question: "", options: ["", "", "", ""], correctOption: "", difficulty: "Medium", explanation: "" }); }} className="text-xs text-red-400">Cancel Edit</button>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea placeholder="Question" className="input-dark w-full h-20" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} required />
              <div className="grid grid-cols-2 gap-2">
                {form.options.map((opt, i) => (
                  <input key={i} placeholder={`Option ${i + 1}`} className="input-dark" value={opt} onChange={e => {
                    const newOpts = [...form.options];
                    newOpts[i] = e.target.value;
                    setForm({ ...form, options: newOpts });
                  }} required />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="Correct Answer" className="input-dark" value={form.correctOption} onChange={e => setForm({ ...form, correctOption: e.target.value })} required />
                <select className="input-dark" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}>
                  <option>Easy</option><option>Medium</option><option>Hard</option>
                </select>
              </div>
              <textarea placeholder="Explanation" className="input-dark w-full h-16" value={form.explanation} onChange={e => setForm({ ...form, explanation: e.target.value })} />
              <button className="w-full btn-primary py-2.5 rounded-lg flex justify-center gap-2">
                {editingMcq ? <Save size={18} /> : <Plus size={18} />} {editingMcq ? "Update" : "Save"}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="space-y-4 max-h-[800px] overflow-y-auto custom-scrollbar">
            {loading ? <p>Loading...</p> : mcqs.map((m, idx) => (
              <div key={m._id} className="bg-[#1a1d21] p-4 rounded-xl border border-white/5 group relative">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(m)} className="p-1.5 bg-blue-500/10 text-blue-400 rounded"><Edit size={14} /></button>
                  <button onClick={() => handleDelete(m._id)} className="p-1.5 bg-red-500/10 text-red-400 rounded"><Trash2 size={14} /></button>
                </div>
                <p className="font-bold mb-2 pr-12"><span className="text-emerald-500">Q{idx + 1}:</span> {m.question}</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                  {m.options.map(o => (
                    <span key={o} className={o === m.correctOption ? "text-emerald-400 font-bold" : ""}>{o}</span>
                  ))}
                </div>
              </div>
            ))}
            {mcqs.length === 0 && <p className="text-gray-500">No MCQs in this topic.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default McqTab;