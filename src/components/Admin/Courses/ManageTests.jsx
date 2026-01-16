import { ClipboardList, Edit2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api";

const ManageTests = () => {
  const [categories, setCategories] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [form, setForm] = useState({ title: "", type: "MCQ", duration: 30, totalMarks: 100, passMarks: 40, isActive: true });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { API.get("/tests/categories").then(res => setCategories(res.data)); }, []);
  useEffect(() => { if (selectedCat) fetchTests(); }, [selectedCat]);

  const fetchTests = async () => {
    const res = await API.get(`/tests/category/${selectedCat}`);
    setTests(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCat) return alert("Select Category First");
    try {
      const payload = { ...form, categoryId: selectedCat };
      if (editingId) await API.put(`/admin-tests/test/${editingId}`, payload);
      else await API.post("/admin-tests/test", payload);
      setForm({ title: "", type: "MCQ", duration: 30, totalMarks: 100, passMarks: 40, isActive: true });
      setEditingId(null);
      fetchTests();
    } catch (err) { alert("Error"); }
  };

  const handleDelete = async (id) => {
    if(confirm("Delete this test?")) { await API.delete(`/admin-tests/test/${id}`); fetchTests(); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <ClipboardList className="text-emerald-500" /> Manage Tests
      </h1>

      {/* Filter */}
      <select className="input-dark w-full md:w-1/3" onChange={e => setSelectedCat(e.target.value)} value={selectedCat}>
        <option value="">-- Select Category --</option>
        {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
      </select>

      {selectedCat && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-1 bg-[#1a1d21] border border-white/5 p-6 rounded-2xl h-fit">
            <h3 className="text-white font-bold mb-4">{editingId ? "Edit Test" : "Create Test"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input placeholder="Test Title" className="input-dark w-full" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Duration (min)" className="input-dark" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} />
                <input type="number" placeholder="Total Marks" className="input-dark" value={form.totalMarks} onChange={e => setForm({...form, totalMarks: e.target.value})} />
              </div>
              <input type="number" placeholder="Pass Marks" className="input-dark w-full" value={form.passMarks} onChange={e => setForm({...form, passMarks: e.target.value})} />
              <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="rounded bg-gray-800 border-gray-600 text-emerald-500 focus:ring-emerald-500" />
                Is Active?
              </label>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl font-medium">{editingId ? "Update" : "Create"}</button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 space-y-3">
             {tests.map(t => (
               <div key={t._id} className="bg-[#1a1d21] border border-white/5 p-4 rounded-xl flex justify-between items-center hover:border-emerald-500/30 transition-colors">
                 <div>
                   <h4 className="font-bold text-white">{t.title}</h4>
                   <p className="text-xs text-gray-500">{t.duration}m | {t.totalMarks} Marks | Pass: {t.passMarks}</p>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => { setForm(t); setEditingId(t._id); }} className="p-2 text-blue-400 bg-blue-500/10 rounded-lg"><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(t._id)} className="p-2 text-red-400 bg-red-500/10 rounded-lg"><Trash2 size={16}/></button>
                 </div>
               </div>
             ))}
             {tests.length === 0 && <p className="text-gray-500 text-center py-10">No tests found in this category.</p>}
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageTests;