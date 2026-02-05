import { Layout, Plus, Video } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import API from "../../../apiHelper/api.js";
import AlertBox from "../../../components/UniversalComponents/AlertBox.jsx";
// Import the split components (assume they are in same file or imported)
import { LectureList, LectureModal, VideoPlayer } from "./LectureComponents"; // Adjust path if needed

const AdminLectures = () => {
  // --- States ---
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [lectures, setLectures] = useState([]);
  const [activeLecture, setActiveLecture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "", videoUrl: "", duration: "", order: 1,
  });

  // --- API Calls ---
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses/");
      const data = res.data.data || res.data;
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Courses fetch error", err);
    }
  };

  const fetchLectures = useCallback(async (courseId) => {
    if (!courseId) return;
    setLoading(true);
    try {
      const res = await API.get(`/admin-tests/lectures/${courseId}`);
      const data = Array.isArray(res.data) ? res.data : [];
      setLectures(data);
      if (data.length > 0) setActiveLecture(data[0]);
      else setActiveLecture(null);
    } catch (err) {
      setAlertInfo({ message: "Lectures fetch failed", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCourses(); }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchLectures(selectedCourse);
    } else {
      setLectures([]);
      setActiveLecture(null);
    }
  }, [selectedCourse, fetchLectures]);

  // --- Handlers ---
  const showAlert = useCallback((message, type) => {
    setAlertInfo({ message, type });
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ title: "", videoUrl: "", duration: "", order: lectures.length + 1 });
    setEditingId(null);
  }, [lectures.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/admin-tests/lecture/${editingId}`, formData);
        showAlert("Lecture updated successfully", "success");
      } else {
        await API.post("/admin-tests/lecture", { ...formData, courseId: selectedCourse });
        showAlert("Lecture added successfully", "success");
      }
      setIsModalOpen(false);
      resetForm();
      fetchLectures(selectedCourse);
    } catch (err) {
      showAlert(err.response?.data?.message || "Operation failed", "error");
    }
  };

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/admin-tests/lecture/${id}`);
      setLectures(prev => {
        const updated = prev.filter(l => l._id !== id);
        if (activeLecture?._id === id) setActiveLecture(updated[0] || null);
        return updated;
      });
      showAlert("Lecture deleted", "success");
    } catch (err) {
      showAlert("Delete failed", "error");
    }
  }, [activeLecture, showAlert]);

  const openEdit = useCallback((e, lecture) => {
    // Note: e.stopPropagation handled in child now for cleaner logic
    setEditingId(lecture._id);
    setFormData({
      title: lecture.title,
      videoUrl: lecture.videoUrl,
      duration: lecture.duration,
      order: lecture.order,
    });
    setIsModalOpen(true);
  }, []);

  const handleSelectLecture = useCallback((lecture) => {
    setActiveLecture(lecture);
  }, []);

  const handleAddNew = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen text-gray-100 p-4 space-y-6">
      {alertInfo && <AlertBox message={alertInfo.message} type={alertInfo.type} onClose={() => setAlertInfo(null)} />}

      {/* Top Bar */}
      <div className="bg-[#1a1d21] p-4 md:p-6 rounded-2xl border border-white/5 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
           <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Video size={24} /></div>
           <div>
             <h1 className="text-xl font-bold">Course Manager</h1>
             <p className="text-xs text-gray-400">Select a course to edit or preview.</p>
           </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select
            className="flex-1 md:min-w-[300px] bg-[#0f1115] border border-gray-700 text-gray-300 text-sm rounded-xl p-3 focus:border-emerald-500 outline-none"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Select Course to Manage --</option>
            {courses.map((c) => <option key={c._id} value={c._id}>{c.title || c.name}</option>)}
          </select>
          <button
            disabled={!selectedCourse}
            onClick={handleAddNew}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 md:px-6 py-3 rounded-xl transition-all font-semibold flex items-center gap-2 shadow-lg"
          >
            <Plus size={18} /> <span className="hidden md:inline">Add Lecture</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {!selectedCourse ? (
        <div className="flex flex-col items-center justify-center h-[60vh] border-2 border-dashed border-gray-800 rounded-3xl bg-[#1a1d21]/30">
          <Layout className="text-gray-700 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-400">No Course Selected</h3>
          <p className="text-gray-600 mt-2">Please select a course from the dropdown above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Memoized Video Player */}
          <VideoPlayer activeLecture={activeLecture} />
          
          {/* Memoized Lecture List */}
          <LectureList 
            lectures={lectures}
            activeId={activeLecture?._id}
            loading={loading}
            onSelect={handleSelectLecture}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Memoized Modal */}
      <LectureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingId}
      />
    </div>
  );
};

export default AdminLectures;