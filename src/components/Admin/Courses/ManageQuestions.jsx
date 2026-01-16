import { FileQuestion, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api";

const ManageQuestions = () => {
  const [categories, setCategories] = useState([]);
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selCat, setSelCat] = useState("");
  const [selTest, setSelTest] = useState("");
  
  const [form, setForm] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "", marks: 1 });

  useEffect(() => { API.get("/tests/categories").then(res => setCategories(res.data)); }, []);
  useEffect(() => { if (selCat) API.get(`/tests/category/${selCat}`).then(res => setTests(res.data)); }, [selCat]);
  useEffect(() => { if (selTest) fetchQuestions(); }, [selTest]);

  const fetchQuestions = async () => {
    const res = await API.get(`/tests/start/${selTest}`); 
    setQuestions(res.data);
  };

  const handleOptionChange = (idx, val) => {
    const newOpts = [...form.options];
    newOpts[idx] = val;
    setForm({ ...form, options: newOpts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin-tests/question", { ...form, testId: selTest });
      setForm({ question: "", options: ["", "", "", ""], correctAnswer: "", marks: 1 });
      fetchQuestions();
    } catch (err) { alert("Error"); }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete?")) { await API.delete(`/admin-tests/question/${id}`); fetchQuestions(); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <FileQuestion className="text-emerald-500" /> Question Bank
      </h1>

      <div className="flex gap-4">
        <select className="input-dark w-1/2" onChange={e => setSelCat(e.target.value)}><option value="">Select Category</option>{categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}</select>
        <select className="input-dark w-1/2" onChange={e => setSelTest(e.target.value)} disabled={!selCat}><option value="">Select Test</option>{tests.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}</select>
      </div>

      {selTest && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-[#1a1d21] border border-white/5 p-6 rounded-2xl h-fit">
            <h3 className="text-white font-bold mb-4">Add New Question</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea placeholder="Question Text" className="input-dark w-full h-24" value={form.question} onChange={e => setForm({...form, question: e.target.value})} required />
              <div className="grid grid-cols-2 gap-2">
                {form.options.map((opt, i) => (
                  <input key={i} placeholder={`Option ${i+1}`} className="input-dark" value={opt} onChange={e => handleOptionChange(i, e.target.value)} required />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <input placeholder="Correct Answer (Exact Text)" className="input-dark" value={form.correctAnswer} onChange={e => setForm({...form, correctAnswer: e.target.value})} required />
                 <input type="number" placeholder="Marks" className="input-dark" value={form.marks} onChange={e => setForm({...form, marks: e.target.value})} required />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium flex justify-center items-center gap-2"><PlusCircle size={18} /> Add Question</button>
            </form>
          </div>

          {/* List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
            {questions.map((q, idx) => (
              <div key={q._id} className="bg-[#1a1d21] border border-white/5 p-5 rounded-2xl relative group">
                <button onClick={() => handleDelete(q._id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500"><Trash2 size={18}/></button>
                <p className="font-bold text-gray-200 mb-2 pr-8"><span className="text-emerald-500">Q{idx+1}:</span> {q.question}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {q.options.map(o => (
                    <span key={o} className={`px-3 py-1 rounded-lg border ${o === q.correctAnswer ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-black/20 border-white/5 text-gray-500"}`}>{o}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageQuestions;