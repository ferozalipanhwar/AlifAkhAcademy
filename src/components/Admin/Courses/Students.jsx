import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt, FaUserEdit, FaUserGraduate } from "react-icons/fa";
import API from "../../../apiHelper/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [newStudent, setNewStudent] = useState({
    fullname: "",
    email: "",
    courseId: "",
  });

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const { data } = await API.get("/students/");
      setStudents(data);
      console.log("Students Data:", data);
    
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  // Fetch Courses
  const fetchCourses = async () => {
    try {
      const { data } = await API.get("/courses/");
      setCourses(data.data);
      
    } catch (err) {
      console.log("Courses Error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  // Add Student
  const handleAddStudent = async () => {
    if (!newStudent.fullname || !newStudent.email || !newStudent.courseId) {
      alert("All fields required!");
      return;
    }

    try {
      await API.post("/students/add", newStudent);
      fetchStudents();
      setNewStudent({ fullname: "", email: "", courseId: "" });
    } catch (err) {
      console.log("Add Error:", err);
    }
  };

  // Delete
  const handleDeleteStudent = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-white w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center gap-2">
        🎓 Students Management
      </h2>

      {/* Add Student Form */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Full Name"
          className="px-4 py-2 rounded bg-gray-700"
          value={newStudent.fullname}
          onChange={(e) =>
            setNewStudent({ ...newStudent, fullname: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded bg-gray-700"
          value={newStudent.email}
          onChange={(e) =>
            setNewStudent({ ...newStudent, email: e.target.value })
          }
        />

        <select
          className="px-4 py-2 rounded bg-gray-700"
          value={newStudent.courseId}
          onChange={(e) =>
            setNewStudent({ ...newStudent, courseId: e.target.value })
          }
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddStudent}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add
        </button>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Course</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s._id} className="border-b border-gray-700">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 flex items-center gap-2">
                  <FaUserGraduate className="text-blue-400" /> {s.fullname}
                </td>
                <td className="p-3">{s.courseId?.title}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3 flex gap-4">
                  <button className="text-yellow-400">
                    <FaUserEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(s._id)}
                    className="text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Students;
