import { motion } from "framer-motion";
import {
  BookOpen,
  Edit2,
  ImagePlus,
  Loader2,
  Plus,
  Search,
  Trash2,
  User,
  Users,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    courseId: "",
    image: null,
  });

  // ===================== FETCH DATA =====================
  const fetchData = async () => {
    try {
      const [coursesRes, teachersRes] = await Promise.all([
        API.get("/courses"),
        API.get("/teachers")
      ]);
      setCourses(coursesRes.data.data);
      setTeachers(teachersRes.data);
      setFilteredTeachers(teachersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===================== SEARCH LOGIC =====================
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const results = teachers.filter(t => 
      t.fullname.toLowerCase().includes(lowerTerm) ||
      (t.courseId?.title || "").toLowerCase().includes(lowerTerm)
    );
    setFilteredTeachers(results);
  }, [searchTerm, teachers]);

  // ===================== IMAGE HANDLER =====================
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTeacher({ ...newTeacher, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ===================== ADD / UPDATE =====================
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.courseId)
      return alert("Please fill all fields!");

    setSubmitting(true);
    const formData = new FormData();
    formData.append("fullname", newTeacher.name);
    formData.append("courseId", newTeacher.courseId);

    if (newTeacher.image) {
      formData.append("img", newTeacher.image);
    }

    try {
      if (editingTeacher) {
        await API.put(`/teachers/${editingTeacher._id}`, formData);
      } else {
        await API.post("/teachers/add", formData);
      }

      // Refresh data
      const res = await API.get("/teachers");
      setTeachers(res.data);
      resetForm();
    } catch (error) {
      console.error("Add/Update error:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  // ===================== RESET FORM =====================
  const resetForm = () => {
    setEditingTeacher(null);
    setNewTeacher({ name: "", courseId: "", image: null });
    setImagePreview(null);
  };

  // ===================== EDIT SETUP =====================
  const handleEditTeacher = (t) => {
    setEditingTeacher(t);
    setNewTeacher({
      name: t.fullname,
      courseId: t.courseId?._id || "",
      image: null,
    });
    setImagePreview(t.img);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===================== DELETE =====================
  const handleDeleteTeacher = async (id) => {
    if (!window.confirm("Are you sure you want to remove this teacher?")) return;
    try {
      await API.delete(`/teachers/${id}`);
      setTeachers(teachers.filter((t) => t._id !== id));
    } catch (error) {
      alert("Delete failed!");
    }
  };

  return (
    <div className="space-y-8 p-2">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="text-emerald-500" /> Teachers Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage instructors and assign them to courses.</p>
        </div>
        
        <div className="flex items-center bg-[#1a1d21] border border-gray-700 rounded-lg px-3 py-2 w-full md:w-72 focus-within:border-emerald-500 transition-colors">
          <Search size={18} className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search teachers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-300 w-full placeholder-gray-600"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* ================= LEFT: FORM ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-[#1a1d21] border border-white/5 p-6 rounded-2xl sticky top-24 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                {editingTeacher ? <Edit2 size={18} className="text-yellow-500" /> : <Plus size={18} className="text-emerald-500" />}
                {editingTeacher ? "Edit Profile" : "Add Teacher"}
              </span>
              {editingTeacher && (
                <button onClick={resetForm} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                  <X size={14} /> Cancel
                </button>
              )}
            </h2>

            <form onSubmit={handleAddOrUpdate} className="space-y-4">
              
              {/* Image Upload */}
              <div className="flex justify-center mb-4">
                <label className="relative w-32 h-32 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-white/5 transition-all overflow-hidden group">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <ImagePlus size={24} className="group-hover:text-emerald-500" />
                      <span className="text-[10px] mt-1">Upload Photo</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Full Name</label>
                <div className="relative mt-1">
                  <User size={14} className="absolute left-3 top-3.5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Instructor Name"
                    className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Assign Course</label>
                <div className="relative mt-1">
                  <BookOpen size={14} className="absolute left-3 top-3.5 text-gray-500" />
                  <select
                    className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm appearance-none"
                    value={newTeacher.courseId}
                    onChange={(e) => setNewTeacher({ ...newTeacher, courseId: e.target.value })}
                  >
                    <option value="">Select a Course...</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-4
                  ${editingTeacher 
                    ? "bg-yellow-600 hover:bg-yellow-700 shadow-yellow-900/20" 
                    : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20"
                  } disabled:opacity-50`}
              >
                {submitting ? <Loader2 className="animate-spin" size={18} /> : (editingTeacher ? "Update Teacher" : "Add Teacher")}
              </button>
            </form>
          </div>
        </motion.div>

        {/* ================= RIGHT: TEACHER GRID ================= */}
        <div className="lg:col-span-2">
           {loading ? (
             <div className="flex justify-center items-center h-64 text-emerald-500">
               <Loader2 size={40} className="animate-spin" />
             </div>
           ) : filteredTeachers.length === 0 ? (
             <div className="bg-[#1a1d21] border border-white/5 rounded-2xl p-10 text-center">
               <p className="text-gray-400">No teachers found.</p>
             </div>
           ) : (
             <div className="grid sm:grid-cols-2 gap-4">
               {filteredTeachers.map((t, index) => (
                 <motion.div
                   key={t._id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className="bg-[#1a1d21] border border-white/5 p-5 rounded-2xl shadow-md hover:border-emerald-500/30 transition-all flex items-center gap-4 group"
                 >
                   <img 
                      src={t.img || "https://via.placeholder.com/100"} 
                      alt={t.fullname} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500/20 group-hover:border-emerald-500 transition-colors"
                   />
                   
                   <div className="flex-1 min-w-0">
                     <h3 className="font-bold text-white text-base truncate">{t.fullname}</h3>
                     <p className="text-xs text-gray-400 flex items-center gap-1 mt-1 truncate">
                       <BookOpen size={12} className="text-emerald-500" />
                       {t.courseId?.title || <span className="text-red-400 italic">No Course</span>}
                     </p>
                   </div>

                   <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => handleEditTeacher(t)}
                        className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteTeacher(t._id)}
                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                   </div>
                 </motion.div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Teachers;