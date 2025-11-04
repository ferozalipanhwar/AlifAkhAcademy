import { motion } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaTrashAlt, FaUserEdit, FaUserGraduate } from "react-icons/fa";

const Students = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Ayesha Khan", course: "Web Development", email: "ayesha@example.com" },
    { id: 2, name: "Bilal Ahmed", course: "Python Basics", email: "bilal@example.com" },
  ]);

  const [newStudent, setNewStudent] = useState({ name: "", course: "", email: "" });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.course && newStudent.email) {
      setStudents([
        ...students,
        { id: Date.now(), name: newStudent.name, course: newStudent.course, email: newStudent.email },
      ]);
      setNewStudent({ name: "", course: "", email: "" });
    } else {
      alert("Please fill out all fields!");
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
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
      <motion.div
        className="flex flex-col md:flex-row gap-4 mb-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <input
          type="text"
          placeholder="Full Name"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Course Name"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
          value={newStudent.course}
          onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
        />
        <button
          onClick={handleAddStudent}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
        >
          <FaPlus /> Add
        </button>
      </motion.div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Course</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <motion.tr
                key={student.id}
                className="border-b border-gray-700 hover:bg-gray-700 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 flex items-center gap-2">
                  <FaUserGraduate className="text-blue-400" /> {student.name}
                </td>
                <td className="p-3">{student.course}</td>
                <td className="p-3 text-gray-300">{student.email}</td>
                <td className="p-3 text-center flex justify-center gap-4">
                  <button className="text-yellow-400 hover:text-yellow-300">
                    <FaUserEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <p className="text-center text-gray-400 mt-6">No students added yet.</p>
      )}
    </motion.div>
  );
};

export default Students;
