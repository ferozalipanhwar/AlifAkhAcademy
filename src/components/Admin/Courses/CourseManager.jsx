import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Edit2,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
  User,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api.js";

const CourseManager = () => {
  const [teachersList, setTeachersList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [newCourse, setNewCourse] = useState({
    title: "",
    duration: "",
    description: "",
    teacherId: "",
    img: null,
  });

  // ===================== FETCH DATA =====================
  const fetchData = async () => {
    try {
      const [teachersRes, coursesRes] = await Promise.all([
        API.get("/teachers/"),
        API.get("/courses/")
      ]);
      setTeachersList(teachersRes.data);
      setCourses(coursesRes.data.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===================== IMAGE HANDLER =====================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCourse({ ...newCourse, img: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ===================== ADD COURSE =====================
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.duration || !newCourse.teacherId)
      return alert("Please fill all required fields");

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", newCourse.title);
      formData.append("duration", newCourse.duration);
      formData.append("description", newCourse.description);
      formData.append("teacherId", newCourse.teacherId);

      if (newCourse.img) formData.append("img", newCourse.img);

      const res = await API.post("/courses/addCourse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCourses([...courses, res.data.data]);
      resetForm();
    } catch (error) {
      console.error("Add error:", error);
      alert("Failed to add course");
    } finally {
      setSubmitting(false);
    }
  };

  // ===================== DELETE COURSE =====================
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await API.delete(`/courses/deleteCourse/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete course");
    }
  };

  // ===================== EDIT SETUP =====================
  const handleEdit = (course) => {
    setEditingCourse(course);
    setNewCourse({
      title: course.title,
      duration: course.duration,
      description: course.description,
      teacherId: course.teacherId?._id || course.teacherId, 
      img: null,
    });
    setPreviewImage(course.img); // Show existing image
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===================== UPDATE COURSE =====================
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", newCourse.title);
      formData.append("duration", newCourse.duration);
      formData.append("description", newCourse.description);
      formData.append("teacherId", newCourse.teacherId);

      if (newCourse.img) formData.append("img", newCourse.img);

      const res = await API.put(
        `/courses/updateCourse/${editingCourse._id}`,
        formData
      );

      setCourses(
        courses.map((c) =>
          c._id === editingCourse._id ? res.data.data : c
        )
      );
      resetForm();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update course");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setEditingCourse(null);
    setNewCourse({
      title: "",
      duration: "",
      description: "",
      teacherId: "",
      img: null,
    });
    setPreviewImage(null);
  };

  return (
    <div className="space-y-8 p-2">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="text-emerald-500" /> Course Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage curriculum, teachers and course details.</p>
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
                {editingCourse ? <Edit2 size={18} className="text-yellow-500" /> : <Plus size={18} className="text-emerald-500" />}
                {editingCourse ? "Edit Course" : "Add New Course"}
              </span>
              {editingCourse && (
                <button onClick={resetForm} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                  <X size={14} /> Cancel
                </button>
              )}
            </h2>

            <form onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse} className="space-y-4">
              
              {/* Image Upload */}
              <div className="relative group">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer bg-[#0f1115] hover:bg-gray-800 hover:border-emerald-500/50 transition-all overflow-hidden">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                      <ImagePlus size={32} className="mb-2 text-gray-500 group-hover:text-emerald-500 transition-colors" />
                      <p className="text-xs">Upload Cover Image</p>
                    </div>
                  )}
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>

              {/* Title */}
              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g. Web Development"
                  className="w-full mt-1 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                />
              </div>

              {/* Duration & Teacher */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 font-medium ml-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 3 Months"
                    className="w-full mt-1 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                  />
                </div>
                <div>
                   <label className="text-xs text-gray-500 font-medium ml-1">Instructor</label>
                   <select
                    className="w-full mt-1 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm appearance-none"
                    value={newCourse.teacherId}
                    onChange={(e) => setNewCourse({ ...newCourse, teacherId: e.target.value })}
                  >
                    <option value="">Select...</option>
                    {teachersList.map((t) => (
                      <option key={t._id} value={t._id}>{t.fullname}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Description</label>
                <textarea
                  className="w-full mt-1 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm resize-none custom-scrollbar"
                  placeholder="Course details..."
                  rows="4"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-2
                  ${editingCourse 
                    ? "bg-yellow-600 hover:bg-yellow-700 shadow-yellow-900/20" 
                    : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {submitting ? <Loader2 className="animate-spin" size={20} /> : (editingCourse ? "Update Course" : "Create Course")}
              </button>
            </form>
          </div>
        </motion.div>

        {/* ================= RIGHT: LIST ================= */}
        <div className="lg:col-span-2">
           {loading ? (
             <div className="flex justify-center items-center h-64 text-emerald-500">
               <Loader2 size={40} className="animate-spin" />
             </div>
           ) : courses.length === 0 ? (
             <div className="bg-[#1a1d21] border border-white/5 rounded-2xl p-10 text-center">
               <p className="text-gray-400">No courses available. Add one!</p>
             </div>
           ) : (
             <div className="grid sm:grid-cols-2 gap-6">
               {courses.map((course, index) => (
                 <motion.div
                   key={course._id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className="bg-[#1a1d21] border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-white/10 transition-all group flex flex-col"
                 >
                   <div className="relative h-48 overflow-hidden">
                     {course.img ? (
                       <img
                         src={course.img}
                         alt={course.title}
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                       />
                     ) : (
                       <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                         <ImagePlus size={40} />
                       </div>
                     )}
                     <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                       <Clock size={10} /> {course.duration}
                     </div>
                   </div>

                   <div className="p-5 flex-1 flex flex-col">
                     <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                       {course.title}
                     </h3>
                     
                     <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                       <User size={14} className="text-emerald-500" />
                       {course.teacherId?.fullname || <span className="text-red-400 italic">Unassigned</span>}
                     </div>

                     <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                       {course.description}
                     </p>

                     <div className="flex gap-2 pt-4 border-t border-white/5">
                       <button
                         onClick={() => handleEdit(course)}
                         className="flex-1 flex items-center justify-center gap-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white py-2 rounded-lg transition-all text-sm font-medium"
                       >
                         <Edit2 size={14} /> Edit
                       </button>
                       <button
                         onClick={() => handleDelete(course._id)}
                         className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-lg transition-all text-sm font-medium"
                       >
                         <Trash2 size={14} /> Delete
                       </button>
                     </div>
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

export default CourseManager;