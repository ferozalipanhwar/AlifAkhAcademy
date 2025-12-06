import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheck, FaImage, FaPlus, FaTimes, FaTrashAlt, FaUserEdit } from "react-icons/fa";
import API from "../../../apiHelper/api";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    courseId: "",
    image: null,
  });

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data.data);
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  };

  // Fetch teachers
  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teachers");
      setTeachers(res.data);
    } catch (error) {
      console.log("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewTeacher({ ...newTeacher, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  // Add or Update Teacher
  const handleAddOrUpdate = async () => {
    if (!newTeacher.name || !newTeacher.courseId)
      return alert("Please fill all fields!");

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

      fetchTeachers();
      resetForm();
    } catch (error) {
      console.log("Add/Update error:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Reset Form
  const resetForm = () => {
    setEditingTeacher(null);
    setNewTeacher({ name: "", courseId: "", image: null });
    setImagePreview(null);
  };

  // Delete teacher
  const handleDeleteTeacher = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/teachers/${id}`);
      fetchTeachers();
    } catch (error) {
      alert("Delete failed!");
    }
  };

  // Edit teacher
  const handleEditTeacher = (t) => {
    setEditingTeacher(t);

    setNewTeacher({
      name: t.fullname,
      courseId: t.courseId?._id,
      image: null,
    });

    setImagePreview(t.img);
  };

  return (
    <motion.div className="bg-gray-800 p-8 rounded-2xl text-white w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Teachers Management</h2>

      {/* Form */}
      <div className="flex gap-4 flex-wrap mb-6">

        <input
          type="text"
          placeholder="Teacher Name"
          className="px-4 py-2 w-full bg-gray-700 rounded"
          value={newTeacher.name}
          onChange={(e) =>
            setNewTeacher({ ...newTeacher, name: e.target.value })
          }
        />

        <select
          className="px-4 py-2 w-full bg-gray-700 rounded"
          value={newTeacher.courseId}
          onChange={(e) =>
            setNewTeacher({ ...newTeacher, courseId: e.target.value })
          }
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        <label className="cursor-pointer bg-blue-600 px-4 py-2 rounded flex items-center gap-2">
          <FaImage /> Upload
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>

        {imagePreview && (
          <img src={imagePreview} className="w-20 h-20 object-cover rounded" />
        )}

        <button
          onClick={handleAddOrUpdate}
          className={`${editingTeacher ? "bg-yellow-500" : "bg-green-600"} px-6 py-2 rounded`}
        >
          {editingTeacher ? <FaCheck /> : <FaPlus />}
          {editingTeacher ? " Update" : " Add"}
        </button>

        {editingTeacher && (
          <button onClick={resetForm} className="bg-red-600 px-6 py-2 rounded">
            <FaTimes /> Cancel
          </button>
        )}
      </div>

      {/* TABLE */}
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3">#</th>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Course</th>
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
              <td className="p-3">{t.courseId?.title}</td>

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

    </motion.div>
  );
};

export default Teachers;
