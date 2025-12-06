import { useEffect, useState } from "react";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import API from "../../../apiHelper/api.js";

const CourseManager = () => {
  const [teachersList, setTeachersList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  const [newCourse, setNewCourse] = useState({
    title: "",
    duration: "",
    description: "",
    teacherId: "",
    img: null,
  });

  // ===================== FETCH TEACHERS =====================
  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teachers/");
      setTeachersList(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ===================== FETCH COURSES =====================
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses/");
      setCourses(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error fetching courses");
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchCourses();
  }, []);

  // ===================== ADD COURSE =====================
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.duration || !newCourse.teacherId)
      return alert("Please fill all required fields");

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

      setNewCourse({
        title: "",
        duration: "",
        description: "",
        teacherId: "",
        img: null,
      });
    } catch (error) {
      console.error("Add error:", error);
      alert("Failed to add course");
    }
  };

  // ===================== DELETE COURSE =====================
  const handleDelete = async (id) => {
    try {
      await API.delete(`/courses/deleteCourse/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete course");
    }
  };

  // ===================== EDIT COURSE =====================
  const handleEdit = (course) => {
    setEditingCourse(course);
    setNewCourse({
      title: course.title,
      duration: course.duration,
      description: course.description,
      teacherId: course.teacherId._id || course.teacherId, // ensure correct value
      img: null,
    });
  };

  // ===================== UPDATE COURSE =====================
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.duration || !newCourse.teacherId)
      return alert("Please fill all required fields");

    try {
      const formData = new FormData();
      formData.append("title", newCourse.title);
      formData.append("duration", newCourse.duration);
      formData.append("description", newCourse.description);
      formData.append("teacherId", newCourse.teacherId); // ✅ fixed

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

      setEditingCourse(null);
      setNewCourse({
        title: "",
        duration: "",
        description: "",
        teacherId: "",
        img: null,
      });
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update course");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">📚 Manage Courses</h1>

      {/* FORM */}
      <form
        onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-2xl mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          {editingCourse ? (
            <>
              <FaEdit className="text-yellow-400" /> Edit Course
            </>
          ) : (
            <>
              <FaPlusCircle className="text-green-400" /> Add New Course
            </>
          )}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Course Name"
            className="p-2 rounded bg-gray-700"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Duration"
            className="p-2 rounded bg-gray-700"
            value={newCourse.duration}
            onChange={(e) =>
              setNewCourse({ ...newCourse, duration: e.target.value })
            }
          />
        </div>

        {/* TEACHER SELECT */}
        <select
          className="p-2 rounded bg-gray-700 w-full mt-4"
          value={newCourse.teacherId}
          onChange={(e) =>
            setNewCourse({ ...newCourse, teacherId: e.target.value })
          }
        >
          <option value="">Select Teacher</option>
          {teachersList.map((t) => (
            <option key={t._id} value={t._id}>
              {t.fullname}
            </option>
          ))}
        </select>

        {/* DESCRIPTION */}
        <textarea
          className="p-2 rounded bg-gray-700 w-full mt-4"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
        ></textarea>

        {/* IMAGE UPLOADER */}
        <input
          type="file"
          className="mt-4"
          onChange={(e) =>
            setNewCourse({ ...newCourse, img: e.target.files[0] })
          }
        />

        <button
          type="submit"
          className={`${
            editingCourse ? "bg-yellow-500" : "bg-blue-600"
          } px-6 py-2 mt-4 rounded-lg`}
        >
          {editingCourse ? "Update Course" : "Add Course"}
        </button>
      </form>

      {/* COURSE CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-gray-800 p-5 rounded-2xl shadow-xl"
          >
            {course.img && (
              <img
                src={course.img}
                className="w-full h-40 object-cover rounded mb-3"
                alt=""
              />
            )}
            <h3 className="text-xl font-bold text-blue-400">{course.title}</h3>
            <p>{course.duration}</p>
            <p>👨‍🏫 {course.teacherId.fullname}</p>
            <p className="text-gray-400">{course.description}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(course)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManager;
