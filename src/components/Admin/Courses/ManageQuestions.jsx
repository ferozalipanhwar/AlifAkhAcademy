import { FileQuestion, List, PlusCircle, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api";
import BulkUploadTakeTestQuestion from "./BulkUploadTakeTestQuestion"; // Import the component created above

const ManageQuestions = () => {
  const [categories, setCategories] = useState([]);
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);
  
  // Selection States
  const [selCat, setSelCat] = useState("");
  const [selTest, setSelTest] = useState("");
  
  // Tab State: 'manual' or 'bulk'
  const [activeTab, setActiveTab] = useState("manual");

  // Manual Form State
  const [form, setForm] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "", marks: 1 });

  // Initial Fetch
  useEffect(() => { API.get("/tests/categories").then(res => setCategories(res.data)); }, []);
  
  // Fetch Tests when Category Changes
  useEffect(() => { 
    setSelTest(""); // Reset test when category changes
    if (selCat) API.get(`/tests/category/${selCat}`).then(res => setTests(res.data)); 
  }, [selCat]);

  // Fetch Questions when Test Changes
  useEffect(() => { 
    if (selTest) fetchQuestions(); 
  }, [selTest]);

  const fetchQuestions = async () => {
    const res = await API.get(`/tests/start/${selTest}`); 
    setQuestions(res.data);
  };

  // --- Manual Form Handlers ---
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
    } catch (err) { alert("Error adding question"); }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete?")) { await API.delete(`/admin-tests/question/${id}`); fetchQuestions(); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <FileQuestion className="text-emerald-500" /> Question Bank
      </h1>

      {/* Selectors */}
      <div className="flex gap-4">
        <select className="input-dark w-1/2" onChange={e => setSelCat(e.target.value)} value={selCat}>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
        </select>
        <select className="input-dark w-1/2" onChange={e => setSelTest(e.target.value)} value={selTest} disabled={!selCat}>
          <option value="">Select Test</option>
          {tests.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}
        </select>
      </div>

      {/* Main Content Area (Hidden until Test Selected) */}
      {selTest && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: Input Methods */}
          <div className="space-y-4">
            
            {/* Tab Switcher */}
            <div className="flex p-1 bg-[#1a1d21] rounded-xl border border-white/5 w-fit">
              <button 
                onClick={() => setActiveTab("manual")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "manual" ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                <List size={16} /> Manual
              </button>
              <button 
                onClick={() => setActiveTab("bulk")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "bulk" ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                <Upload size={16} /> Bulk Upload
              </button>
            </div>

            {/* CONDITIONAL RENDER: Manual Form OR Bulk Upload */}
            {activeTab === "manual" ? (
              <div className="bg-[#1a1d21] border border-white/5 p-6 rounded-2xl h-fit animate-in fade-in">
                <h3 className="text-white font-bold mb-4">Add Single Question</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea placeholder="Question Text" className="input-dark w-full h-24" value={form.question} onChange={e => setForm({...form, question: e.target.value})} required />
                  <div className="grid grid-cols-2 gap-2">
                    {form.options.map((opt, i) => (
                      <input key={i} placeholder={`Option ${i+1}`} className="input-dark" value={opt} onChange={e => handleOptionChange(i, e.target.value)} required />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                     <input placeholder="Correct Answer (Exact)" className="input-dark" value={form.correctAnswer} onChange={e => setForm({...form, correctAnswer: e.target.value})} required />
                     <input type="number" placeholder="Marks" className="input-dark" value={form.marks} onChange={e => setForm({...form, marks: e.target.value})} required />
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium flex justify-center items-center gap-2">
                    <PlusCircle size={18} /> Add Question
                  </button>
                </form>
              </div>
            ) : (
              // Bulk Upload Component - Passes selTest ID and Refresh Function
              <div className="animate-in fade-in">
                 <BulkUploadTakeTestQuestion testId={selTest} onSuccess={fetchQuestions} />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Question List */}
          <div className="bg-[#1a1d21] border border-white/5 p-6 rounded-2xl h-[650px] flex flex-col">
            <h3 className="text-white font-bold mb-4 flex justify-between items-center">
              <span>Existing Questions</span>
              <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">Count: {questions.length}</span>
            </h3>
            
            <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-2">
              {questions.length === 0 ? (
                <div className="text-gray-500 text-center mt-20 italic">No questions added yet.</div>
              ) : (
                questions.map((q, idx) => (
                  <div key={q._id} className="bg-black/20 border border-white/5 p-4 rounded-xl relative group hover:border-emerald-500/30 transition-colors">
                    <button onClick={() => handleDelete(q._id)} className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition-colors bg-black/40 p-1.5 rounded-lg"><Trash2 size={16}/></button>
                    <p className="font-bold text-gray-200 mb-3 pr-8 text-sm"><span className="text-emerald-500 mr-2">Q{idx+1}.</span>{q.question}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {q.options.map((o, i) => (
                        <span key={i} className={`px-2 py-1.5 rounded-md border truncate ${o === q.correctAnswer ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-black/20 border-white/5 text-gray-500"}`}>{o}</span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ManageQuestions;