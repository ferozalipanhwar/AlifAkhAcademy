import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheck, FaImage, FaPlus, FaTimes, FaTrashAlt, FaUserEdit } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/teachers";

const getToken = () => localStorage.getItem("authToken");

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [SubjList] = useState([
    { name: "Web Development" },
    { name: "Python" },
    { name: "Java" },
    { name: "Mathematics" },
    { name: "English" },
  ]);

  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "", image: null });
  const [editingTeacher, setEditingTeacher] = useState(null);

  const fetchTeachers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTeachers(data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  setNewTeacher({ ...newTeacher, image: file });

  // preview
  setImagePreview(URL.createObjectURL(file));
};


  const handleAddOrUpdate = async () => {
    const token = getToken();
    if (!token) return alert("You must be logged in.");

    if (!newTeacher.name || !newTeacher.subject)
      return alert("Please fill all fields!");

    const formData = new FormData();
    formData.append("fullname", newTeacher.name);
    formData.append("subject", newTeacher.subject);

    if (newTeacher.image) formData.append("img", newTeacher.image);

    let url = API_URL + "/add";
    let method = "POST";

    if (editingTeacher) {
      url = `${API_URL}/${editingTeacher._id}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.status === 401 || res.status === 403)
      return alert("Not Authorized!");

    await res.json();
    fetchTeachers();
    setEditingTeacher(null);
    setNewTeacher({ name: "", subject: "", image: null });
    setImagePreview(null);

  };

  const handleDeleteTeacher = async (id) => {
    const token = getToken();
    if (!token) return alert("Not logged in");

    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401 || res.status === 403)
      return alert("Not Authorized!");

    fetchTeachers();
  };

const handleEditTeacher = (t) => {
  setEditingTeacher(t);
  setNewTeacher({ name: t.fullname, subject: t.subject, image: null });
  setImagePreview(t.img);  // show existing image
};


  return (
    <motion.div className="bg-gray-800 p-8 rounded-2xl text-white w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">👨‍🏫 Teachers Management</h2>

      {/* Form */}
      <div className="flex gap-4 flex-wrap mb-6">
        <input
          type="text"
          placeholder="Teacher Name"
          className="px-4 py-2 w-full bg-gray-700 rounded"
          value={newTeacher.name}
          onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
        />

        <select
          className="px-4 py-2 w-full bg-gray-700 rounded"
          value={newTeacher.subject}
          onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
        >
          <option value="">Select Subject</option>
          {SubjList.map((s, i) => (
            <option key={i}>{s.name}</option>
          ))}
        </select>

        <label className="cursor-pointer bg-blue-600 px-4 py-2 rounded flex items-center gap-2">
          <FaImage /> Upload
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
        {imagePreview && (
  <img 
    src={imagePreview} 
    alt="Preview" 
    className="w-20 h-20 object-cover rounded border-2 border-gray-600"
  />
)}


        <button
          onClick={handleAddOrUpdate}
          className={`${editingTeacher ? "bg-yellow-500" : "bg-green-600"} px-6 py-2 rounded`}
        >
          {editingTeacher ? <FaCheck /> : <FaPlus />} {editingTeacher ? "Update" : "Add"}
        </button>

        {editingTeacher && (
          <button
            onClick={() => {
              setEditingTeacher(null);
              setNewTeacher({ name: "", subject: "", image: null });
            }}
            className="bg-red-600 px-6 py-2 rounded"
          >
            <FaTimes /> Cancel
          </button>
        )}
      </div>

      {/* Table */}
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3">#</th>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Subject</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((t, i) => (
            <tr key={t._id} className="border-b border-gray-700">
              <td className="p-3">{i + 1}</td>
              <td className="p-3">
                <img src={t.img} className="w-12 h-12 rounded-full object-cover" />
              </td>
              <td className="p-3">{t.fullname}</td>
              <td className="p-3">{t.subject}</td>
              <td className="p-3 text-center flex justify-center gap-4">
                <button onClick={() => handleEditTeacher(t)} className="text-yellow-400">
                  <FaUserEdit />
                </button>
                <button onClick={() => handleDeleteTeacher(t._id)} className="text-red-500">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {teachers.length === 0 && <p className="text-center mt-6 text-gray-400">No teachers yet.</p>}
    </motion.div>
  );
};

export default Teachers;
