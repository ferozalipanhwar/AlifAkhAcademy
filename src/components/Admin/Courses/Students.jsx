import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Loader2,
  Mail,
  Plus,
  Search,
  Trash2,
  User
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newStudent, setNewStudent] = useState({
    fullname: "",
    email: "",
    courseId: "",
  });

  // ===================== FETCH DATA =====================
  const fetchData = async () => {
    try {
      const [studentsRes, coursesRes] = await Promise.all([
        API.get("/students/"),
        API.get("/courses/")
      ]);
      setStudents(studentsRes.data);
      setFilteredStudents(studentsRes.data);
      setCourses(coursesRes.data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
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
    const results = students.filter(s => 
      s.fullname.toLowerCase().includes(lowerTerm) || 
      s.email.toLowerCase().includes(lowerTerm)
    );
    setFilteredStudents(results);
  }, [searchTerm, students]);

  // ===================== ADD STUDENT =====================
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.fullname || !newStudent.email || !newStudent.courseId) {
      alert("Please fill all fields!");
      return;
    }

    setSubmitting(true);
    try {
      await API.post("/students/add", newStudent);
      // Refresh list manually to avoid full re-fetch if backend returns the object, 
      // but here we re-fetch to be safe or append if you update logic.
      const { data } = await API.get("/students/"); 
      setStudents(data);
      setNewStudent({ fullname: "", email: "", courseId: "" });
    } catch (err) {
      console.error("Add Error:", err);
      alert("Failed to add student.");
    } finally {
      setSubmitting(false);
    }
  };

  // ===================== DELETE STUDENT =====================
  const handleDeleteStudent = async (id) => {
    if(!window.confirm("Are you sure you want to remove this student?")) return;
    try {
      await API.delete(`/students/${id}`);
      setStudents(students.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete student.");
    }
  };

  return (
    <div className="space-y-8 p-2">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="text-emerald-500" /> Student Directory
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage enrolled students and their assigned courses.</p>
        </div>
        
        <div className="flex items-center bg-[#1a1d21] border border-gray-700 rounded-lg px-3 py-2 w-full md:w-72 focus-within:border-emerald-500 transition-colors">
          <Search size={18} className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-300 w-full placeholder-gray-600"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* ================= LEFT: ADD FORM ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-[#1a1d21] border border-white/5 p-6 rounded-2xl sticky top-24 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Plus size={18} className="text-emerald-500" /> Register Student
            </h2>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Full Name</label>
                <div className="relative mt-1">
                  <User size={14} className="absolute left-3 top-3.5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                    value={newStudent.fullname}
                    onChange={(e) => setNewStudent({ ...newStudent, fullname: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Email Address</label>
                <div className="relative mt-1">
                  <Mail size={14} className="absolute left-3 top-3.5 text-gray-500" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Assign Course</label>
                <div className="relative mt-1">
                  <BookOpen size={14} className="absolute left-3 top-3.5 text-gray-500" />
                  <select
                    className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm appearance-none"
                    value={newStudent.courseId}
                    onChange={(e) => setNewStudent({ ...newStudent, courseId: e.target.value })}
                  >
                    <option value="">Select a course...</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {submitting ? <Loader2 className="animate-spin" size={18} /> : "Add Student"}
              </button>
            </form>
          </div>
        </motion.div>

        {/* ================= RIGHT: STUDENT LIST ================= */}
        <div className="lg:col-span-2">
           {loading ? (
             <div className="flex justify-center items-center h-64 text-emerald-500">
               <Loader2 size={40} className="animate-spin" />
             </div>
           ) : filteredStudents.length === 0 ? (
             <div className="bg-[#1a1d21] border border-white/5 rounded-2xl p-10 text-center">
               <p className="text-gray-400">No students found.</p>
             </div>
           ) : (
             <div className="grid sm:grid-cols-2 gap-4">
               {filteredStudents.map((s, index) => (
                 <motion.div
                   key={s._id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.05 }}
                   className="bg-[#1a1d21] border border-white/5 p-5 rounded-2xl shadow-md hover:border-emerald-500/30 transition-all group relative"
                 >
                   <div className="flex items-start justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                         {s.fullname.charAt(0).toUpperCase()}
                       </div>
                       <div>
                         <h3 className="font-bold text-white text-sm">{s.fullname}</h3>
                         <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                           <Mail size={10} /> {s.email}
                         </p>
                       </div>
                     </div>
                     
                     <button 
                        onClick={() => handleDeleteStudent(s._id)}
                        className="text-gray-600 hover:text-red-400 p-1 rounded transition-colors"
                     >
                       <Trash2 size={16} />
                     </button>
                   </div>

                   <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-xs text-gray-500 uppercase font-semibold">Enrolled In</span>
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20">
                        {s.courseId?.title || "No Course"}
                      </span>
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

export default Students;