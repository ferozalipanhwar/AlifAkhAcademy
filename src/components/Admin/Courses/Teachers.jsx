import { motion } from "framer-motion";
import { useState } from "react";
import { FaCheck, FaImage, FaPlus, FaTimes, FaTrashAlt, FaUserEdit } from "react-icons/fa";

const Teachers = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Ali Khan", subject: "Mathematics", image: "https://i.pravatar.cc/100?img=3" },
    { id: 2, name: "Sara Ahmed", subject: "English", image: "https://i.pravatar.cc/100?img=5" },
  ]);

  const [SubjList] = useState([
    { id: "s1", name: "Web Development" },
    { id: "s2", name: "Python" },
    { id: "s3", name: "Java" },
    { id: "s4", name: "Mathematics" },
    { id: "s5", name: "English" },
  ]);

  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "", image: "" });
  const [editingTeacher, setEditingTeacher] = useState(null);

  // 🧩 Add or Update Teacher
  const handleAddOrUpdate = () => {
    if (!newTeacher.name || !newTeacher.subject || !newTeacher.image) {
      alert("Please fill all fields including image!");
      return;
    }

    if (editingTeacher) {
      setTeachers(
        teachers.map((t) =>
          t.id === editingTeacher.id ? { ...t, ...newTeacher } : t
        )
      );
      setEditingTeacher(null);
    } else {
      setTeachers([
        ...teachers,
        { id: Date.now(), ...newTeacher },
      ]);
    }

    setNewTeacher({ name: "", subject: "", image: "" });
  };

  // 🧩 Delete Teacher
  const handleDeleteTeacher = (id) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  // 🧩 Edit Teacher
  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher({ name: teacher.name, subject: teacher.subject, image: teacher.image });
  };

  // 🧩 Image upload preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTeacher({ ...newTeacher, image: reader.result });
      };
      reader.readAsDataURL(file);
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
        👨‍🏫 Teachers Management
      </h2>

      {/* Add / Edit Form */}
      <motion.div
        className="flex flex-col md:flex-row flex-wrap gap-4 mb-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex-1">
          <input
            type="text"
            placeholder="Teacher Name"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
          />
        </div>

        {/* Subject Dropdown */}
        <div className="flex-1">
          <select
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
            value={newTeacher.subject}
            onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
          >
            <option value="">Select Subject</option>
            {SubjList.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="upload"
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <FaImage /> Upload
          </label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {newTeacher.image && (
            <img
              src={newTeacher.image}
              alt="preview"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            />
          )}
        </div>

        {/* Add / Update Button */}
        <button
          onClick={handleAddOrUpdate}
          className={`${
            editingTeacher
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          } px-6 py-2 rounded-lg flex items-center gap-2 transition-all`}
        >
          {editingTeacher ? <FaCheck /> : <FaPlus />}
          {editingTeacher ? "Update" : "Add"}
        </button>

        {editingTeacher && (
          <button
            onClick={() => {
              setEditingTeacher(null);
              setNewTeacher({ name: "", subject: "", image: "" });
            }}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <FaTimes /> Cancel
          </button>
        )}
      </motion.div>

      {/* Teachers Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">#</th>
              <th className="p-3">Image</th>
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
                <td className="p-3">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                  />
                </td>
                <td className="p-3 font-semibold text-blue-400">{teacher.name}</td>
                <td className="p-3">{teacher.subject}</td>
                <td className="p-3 text-center flex justify-center gap-4">
                  <button
                    onClick={() => handleEditTeacher(teacher)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
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
