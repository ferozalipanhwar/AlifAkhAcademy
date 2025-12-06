import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const BlogManager = () => {
  const API = "http://localhost:5000/api/blog";
  const token = localStorage.getItem("authToken"); // admin token

  const [blogs, setBlogs] = useState([]);
  const [fileInput, setFileInput] = useState(null);

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    image: "",
  });

  // 🚀 Load Blogs from Backend
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API}/`);
      setBlogs(res.data);
  
    } catch (err) {
      console.log(err);
    }
  };

  // 📤 Handle Image Upload (Preview + File Save)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFileInput(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewBlog({ ...newBlog, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // ➕ Add Blog (POST API)
  const handleAddBlog = async () => {
    if (
      !newBlog.title ||
      !newBlog.content ||
      !newBlog.author ||
      !newBlog.category ||
      !fileInput
    ) {
      return alert("⚠️ Please fill all fields & upload an image!");
    }

    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    formData.append("author", newBlog.author);
    formData.append("category", newBlog.category);
    formData.append("img", fileInput);

    try {
      const res = await axios.post(`${API}/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Blog added successfully!");
      setBlogs([...blogs, res.data.blog]);

      setNewBlog({
        title: "",
        content: "",
        author: "",
        category: "",
        image: "",
      });
      setFileInput(null);
    } catch (err) {
      console.log(err);
      alert("❌ Error adding blog");
    }
  };

  // 🗑 Delete Blog
  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.log(err);
      alert("❌ Error deleting blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-indigo-400">
        📝 Blog Manager (Live API Connected)
      </h1>

      {/* Add Blog Form */}
      <motion.div
        className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-300">
          Add New Blog
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-400 outline-none"
          />

          <textarea
            placeholder="Write your blog content..."
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
            rows="4"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-400 outline-none"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Author Name"
              value={newBlog.author}
              onChange={(e) =>
                setNewBlog({ ...newBlog, author: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-400 outline-none"
            />

            <input
              type="text"
              placeholder="Category (e.g., Tech, Travel, Health)"
              value={newBlog.category}
              onChange={(e) =>
                setNewBlog({ ...newBlog, category: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-400 outline-none"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700"
          />

          {newBlog.image && (
            <div className="mt-3 flex justify-center">
              <img
                src={newBlog.image}
                alt="Preview"
                className="rounded-lg w-40 h-28 object-cover border border-gray-700"
              />
            </div>
          )}

          <div className="text-center mt-6">
            <button
              onClick={handleAddBlog}
              className="bg-indigo-600 hover:bg-indigo-500 transition-all px-8 py-3 rounded-lg font-semibold text-white shadow-md"
            >
              Add Blog
            </button>
          </div>
        </div>
      </motion.div>

      {/* Display Blogs */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-300 text-center">
          All Blogs ({blogs.length})
        </h2>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-400">No blogs found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-indigo-500/30 transition"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-indigo-400 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="font-semibold">Author:</span> {blog.author}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="font-semibold">Category:</span>{" "}
                    {blog.category}
                  </p>
                  <p className="text-sm text-gray-400 mb-3">
                    {blog.content.substring(0, 80)}...
                  </p>
                  <p className="text-xs text-gray-500">
                    🕒 {new Date(blog.createdAt).toLocaleString()}
                  </p>

                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="mt-3 flex items-center gap-2 bg-red-600 hover:bg-red-500 transition-all px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManager;
