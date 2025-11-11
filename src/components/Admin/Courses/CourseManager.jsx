import { motion } from "framer-motion";
import { useState } from "react";
import { FaCheck, FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";

const CourseManager = () => {
  // Example teacher list (you can replace with DB fetch)
  const teachersList = [
    { id: "t1", name: "Mr. Ahmed" },
    { id: "t2", name: "Ms. Fatima" },
    { id: "t3", name: "Sir John" },
  ];

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Web Development",
      duration: "3 Months",
      desc: "Learn HTML, CSS, JS, React, and Node.js.",
      teacher: "Mr. Ahmed",
    },
    {
      id: 2,
      name: "Python Basics",
      duration: "2 Months",
      desc: "Learn Python fundamentals and data handling.",
      teacher: "Ms. Fatima",
    },
  ]);

  const [newCourse, setNewCourse] = useState({
    name: "",
    duration: "",
    desc: "",
    teacher: "",
  });

  const [editingCourse, setEditingCourse] = useState(null);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.duration || !newCourse.teacher)
      return alert("Please fill in all fields.");

    const newEntry = { id: Date.now(), ...newCourse };
    setCourses([...courses, newEntry]);
    setNewCourse({ name: "", duration: "", desc: "", teacher: "" });
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setNewCourse(course);
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    setCourses(
      courses.map((course) =>
        course.id === editingCourse.id ? { ...course, ...newCourse } : course
      )
    );
    setEditingCourse(null);
    setNewCourse({ name: "", duration: "", desc: "", teacher: "" });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 flex items-center gap-2"
      >
        📚 Manage Courses
      </motion.h1>

      {/* Add / Edit Course Form */}
      <motion.form
        onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
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
            className="p-2 rounded bg-gray-700 focus:outline-none w-full"
            value={newCourse.name}
            onChange={(e) =>
              setNewCourse({ ...newCourse, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Duration (e.g. 3 Months)"
            className="p-2 rounded bg-gray-700 focus:outline-none w-full"
            value={newCourse.duration}
            onChange={(e) =>
              setNewCourse({ ...newCourse, duration: e.target.value })
            }
          />
        </div>

        {/* Dropdown for Teachers */}
        <select
          className="p-2 rounded bg-gray-700 focus:outline-none w-full mt-4"
          value={newCourse.teacher}
          onChange={(e) =>
            setNewCourse({ ...newCourse, teacher: e.target.value })
          }
        >
          <option value="">Select Teacher</option>
          {teachersList.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Course Description"
          className="p-2 rounded bg-gray-700 focus:outline-none w-full mt-4"
          value={newCourse.desc}
          onChange={(e) => setNewCourse({ ...newCourse, desc: e.target.value })}
        ></textarea>

        <button
          type="submit"
          className={`${
            editingCourse
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          } px-6 py-2 mt-4 rounded-lg font-semibold transition-all`}
        >
          {editingCourse ? (
            <span className="flex items-center gap-2">
              <FaCheck /> Update Course
            </span>
          ) : (
            "Add Course"
          )}
        </button>
      </motion.form>

      {/* Course List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
      >
        {courses.length === 0 ? (
          <p className="text-gray-400 text-center w-full">
            No courses added yet.
          </p>
        ) : (
          courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between border border-gray-700"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-400">
                  {course.name}
                </h3>
                <p className="text-gray-400 mb-1">{course.duration}</p>
                <p className="text-gray-300 text-sm mb-1">
                  👨‍🏫 {course.teacher}
                </p>
                <p className="text-gray-400 text-sm">{course.desc}</p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleEdit(course)}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-lg text-sm"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default CourseManager;
