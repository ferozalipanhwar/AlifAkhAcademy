import { Trash2 } from "lucide-react";
import { useState } from "react";
import API from "../../../apiHelper/api.js";

const SubjectTab = ({ subjects, fetchSubjects }) => {
  const [form, setForm] = useState({ title: "", slug: "", icon: "FaBook" });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title) return;
    try {
      await API.post("/prep/subject", form);
      setForm({ title: "", slug: "", icon: "FaBook" });
      fetchSubjects(); // Refresh parent list
    } catch (err) {
      alert("Error adding subject");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this Subject? Topics will be orphaned.")) return;
    await API.delete(`/prep/subject/${id}`);
    fetchSubjects();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
      {/* Form */}
      <div className="bg-[#1a1d21] p-6 rounded-xl border border-white/5 h-fit">
        <h3 className="font-bold mb-4">Add New Subject</h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <input 
            placeholder="Title" 
            className="input-dark w-full" 
            value={form.title} 
            onChange={e => setForm({ ...form, title: e.target.value })} 
          />
          <input 
            placeholder="Slug (e.g. pak-study)" 
            className="input-dark w-full" 
            value={form.slug} 
            onChange={e => setForm({ ...form, slug: e.target.value })} 
          />
          <button className="w-full btn-primary py-2 rounded-lg">Add Subject</button>
        </form>
      </div>

      {/* List */}
      <div className="col-span-2 space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
        {subjects.map(s => (
          <div key={s._id} className="bg-[#1a1d21] p-4 rounded-xl border border-white/5 flex justify-between items-center">
            <span className="font-medium">{s.title}</span>
            <button onClick={() => handleDelete(s._id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {subjects.length === 0 && <p className="text-gray-500">No subjects found.</p>}
      </div>
    </div>
  );
};

export default SubjectTab;