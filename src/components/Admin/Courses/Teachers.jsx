import { motion } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaTrashAlt, FaUserEdit } from "react-icons/fa";

const Teachers = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Ali Khan", subject: "Mathematics" },
    { id: 2, name: "Sara Ahmed", subject: "English" },
  ]);

  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "" });

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.subject) {
      setTeachers([
        ...teachers,
        { id: Date.now(), name: newTeacher.name, subject: newTeacher.subject },
      ]);
      setNewTeacher({ name: "", subject: "" });
    } else {
      alert("Please fill out all fields!");
    }
  };

  const handleDeleteTeacher = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <motion.div
      className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-white w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center gap-2">
        👨‍🏫 Teachers Management
      </h2>

      {/* Add Teacher Form */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 mb-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <input
          type="text"
          placeholder="Teacher Name"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
          value={newTeacher.name}
          onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subject"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
          value={newTeacher.subject}
          onChange={(e) =>
            setNewTeacher({ ...newTeacher, subject: e.target.value })
          }
        />
        <button
          onClick={handleAddTeacher}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
        >
          <FaPlus /> Add
        </button>
      </motion.div>

      {/* Teachers List */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Subject</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <motion.tr
                key={teacher.id}
                className="border-b border-gray-700 hover:bg-gray-700 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{teacher.name}</td>
                <td className="p-3">{teacher.subject}</td>
                <td className="p-3 text-center flex justify-center gap-4">
                  <button className="text-yellow-400 hover:text-yellow-300">
                    <FaUserEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher.id)}
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

      {teachers.length === 0 && (
        <p className="text-center text-gray-400 mt-6">No teachers added yet.</p>
      )}
    </motion.div>
  );
};

export default Teachers;
