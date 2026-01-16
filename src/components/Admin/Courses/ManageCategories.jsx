import { Edit2, Layers, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", icon: "", slug: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    const res = await API.get("/tests/categories");
    setCategories(res.data);
    console.log(res.data);
    
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await API.put(`/admin-tests/category/${editingId}`, form);
      else await API.post("/admin-tests/category", form);
      setForm({ title: "", description: "", icon: "", slug: "" });
      setEditingId(null);
      fetchCategories();
    } catch (err) { alert("Failed"); }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this category?")) {
      await API.delete(`/admin-tests/category/${id}`);
      fetchCategories();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <Layers className="text-emerald-500" /> Test Categories
      </h1>

      {/* Input Form */}
      <div className="bg-[#1a1d21] border border-white/5 p-6 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Title" className="input-dark" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <input placeholder="Slug (e.g. computer-science)" className="input-dark" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} />
          <input placeholder="Icon (Emoji or URL)" className="input-dark" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} />
          <input placeholder="Description" className="input-dark" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <button className="col-span-1 md:col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-medium transition-colors">
            {editingId ? "Update Category" : "Add New Category"}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-[#1a1d21] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-gray-400 text-xs uppercase">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Slug</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-300">
            {categories.map(cat => (
              <tr key={cat._id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white">{cat.title}</td>
                <td className="p-4 text-gray-500">{cat.slug}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={() => { setForm(cat); setEditingId(cat._id); }} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit2 size={16}/></button>
                  <button onClick={() => handleDelete(cat._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageCategories;