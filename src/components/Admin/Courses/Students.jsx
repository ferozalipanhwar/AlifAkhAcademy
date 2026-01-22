import { motion } from "framer-motion";
import {
  BookOpen,
  Check,
  ChevronDown,
  GraduationCap,
  Loader2,
  Plus,
  Search,
  Trash2,
  User,
  Users as UsersIcon,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import API from "../../../apiHelper/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Lists for Dropdowns
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- NEW STATE FOR USER SEARCH DROPDOWN ---
  const [userSearch, setUserSearch] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // To close dropdown when clicking outside

  const [formData, setFormData] = useState({
    userId: "",
    courseId: "",
  });

  // ===================== FETCH DATA =====================
  const fetchData = async () => {
    try {
      const [studentsRes, coursesRes, usersRes] = await Promise.all([
        API.get("/students/"),
        API.get("/courses/"),
        API.get("/user/"),
      ]);

      setStudents(studentsRes.data);
      setFilteredStudents(studentsRes.data);

      setCourses(coursesRes.data.data || coursesRes.data);
      setUsers(usersRes.data.data || usersRes.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===================== CLOSE DROPDOWN ON CLICK OUTSIDE =====================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===================== MAIN SEARCH (STUDENT LIST) =====================
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const results = students.filter((s) => {
      const name = s.userId?.name?.toLowerCase() || "";
      const email = s.userId?.email?.toLowerCase() || "";
      return name.includes(lowerTerm) || email.includes(lowerTerm);
    });
    setFilteredStudents(results);
  }, [searchTerm, students]);

  // ===================== USER DROPDOWN FILTER LOGIC =====================
  // Filter users list based on the email typed in the "Add Student" form
  const filteredUsersForDropdown = users.filter((user) =>
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleSelectUser = (user) => {
    setFormData({ ...formData, userId: user._id });
    setUserSearch(user.email); // Set input to show selected email
    setIsUserDropdownOpen(false); // Close dropdown
  };

  const handleClearUserSelection = () => {
    setFormData({ ...formData, userId: "" });
    setUserSearch("");
    setIsUserDropdownOpen(false);
  };

  // ===================== ADD STUDENT =====================
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.courseId) {
      alert("Please select a user and a course!");
      return;
    }

    setSubmitting(true);
    try {
      await API.post("/students/add", formData);

      const { data } = await API.get("/students/");
      setStudents(data);
      // Reset Form
      setFormData({ userId: "", courseId: "" });
      setUserSearch(""); // Clear search input
    } catch (err) {
      console.error("Add Error:", err);
      alert(err.response?.data?.message || "Failed to add student.");
    } finally {
      setSubmitting(false);
    }
  };

  // ===================== DELETE STUDENT =====================
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to remove this enrollment?"))
      return;
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
            <GraduationCap className="text-emerald-500" /> Student Enrollments
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Assign existing users to courses.
          </p>
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
              <Plus size={18} className="text-emerald-500" /> Enroll User
            </h2>

            <form onSubmit={handleAddStudent} className="space-y-4">
              
              {/* === SEARCHABLE USER DROPDOWN (BY EMAIL) === */}
              <div ref={dropdownRef} className="relative">
                <label className="text-xs text-gray-500 font-medium ml-1">
                  Search User by Email
                </label>
                <div className="relative mt-1">
                  <User
                    size={14}
                    className="absolute left-3 top-3.5 text-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Type email to search..."
                    className="w-full pl-9 pr-8 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                    value={userSearch}
                    onChange={(e) => {
                      setUserSearch(e.target.value);
                      setIsUserDropdownOpen(true);
                      // If user clears input, clear ID
                      if (e.target.value === "")
                        setFormData({ ...formData, userId: "" });
                    }}
                    onFocus={() => setIsUserDropdownOpen(true)}
                  />
                  
                  {/* Clear Button or Arrow */}
                  <div className="absolute right-3 top-3.5 text-gray-500 cursor-pointer">
                    {formData.userId ? (
                      <X size={14} onClick={handleClearUserSelection} />
                    ) : (
                      <ChevronDown
                        size={14}
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      />
                    )}
                  </div>
                </div>

                {/* DROPDOWN LIST */}
                {isUserDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-[#0f1115] border border-gray-700 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
                    {filteredUsersForDropdown.length > 0 ? (
                      filteredUsersForDropdown.map((user) => (
                        <div
                          key={user._id}
                          onClick={() => handleSelectUser(user)}
                          className={`p-3 text-sm cursor-pointer transition-colors flex justify-between items-center ${
                            formData.userId === user._id
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "text-gray-300 hover:bg-[#1a1d21]"
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{user.email}</span>
                            <span className="text-xs text-gray-500">
                              {user.name}
                            </span>
                          </div>
                          {formData.userId === user._id && (
                            <Check size={14} className="text-emerald-500" />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-sm text-gray-500 text-center">
                        No users found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* === SELECT COURSE DROPDOWN === */}
              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">
                  Assign Course
                </label>
                <div className="relative mt-1">
                  <BookOpen
                    size={14}
                    className="absolute left-3 top-3.5 text-gray-500"
                  />
                  <select
                    className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm appearance-none"
                    value={formData.courseId}
                    onChange={(e) =>
                      setFormData({ ...formData, courseId: e.target.value })
                    }
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
                {submitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Enroll Student"
                )}
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
                        {s.userId?.name
                          ? s.userId.name.charAt(0).toUpperCase()
                          : "?"}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">
                          {s.userId?.name || "Unknown User"}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <UsersIcon size={10} /> {s.userId?.email || "No Email"}
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
                    <span className="text-xs text-gray-500 uppercase font-semibold">
                      Enrolled In
                    </span>
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