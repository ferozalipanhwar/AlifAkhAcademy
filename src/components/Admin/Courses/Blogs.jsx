import { motion } from "framer-motion";
import { useState } from "react";
import { FaImage, FaPlusCircle, FaTrash } from "react-icons/fa";

const Blogs = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "The Future of Learning",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      content:
        "Technology has transformed education forever — from online classrooms to AI tutors, the future of learning is interactive and accessible.",
    },
  ]);

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewBlog({ ...newBlog, image: imageUrl });
    }
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content || !newBlog.image)
      return alert("Please fill in all fields and upload an image!");
    const newEntry = { id: Date.now(), ...newBlog };
    setBlogs([...blogs, newEntry]);
    setNewBlog({ title: "", content: "", image: "" });
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 flex items-center gap-2"
      >
        📝 Manage Blogs
      </motion.h1>

      {/* Add Blog Form */}
      <motion.form
        onSubmit={handleAddBlog}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-2xl mb-10"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaPlusCircle className="text-green-400" /> Add New Blog
        </h2>

        <input
          type="text"
          placeholder="Blog Title"
          className="p-2 rounded bg-gray-700 focus:outline-none w-full mb-4"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />

        <textarea
          placeholder="Write your blog content here..."
          className="p-2 rounded bg-gray-700 focus:outline-none w-full mb-4 h-32"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        ></textarea>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
            <FaImage /> Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {newBlog.image && (
            <img
              src={newBlog.image}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border border-gray-600"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 mt-4 rounded-lg font-semibold transition-all"
        >
          Publish Blog
        </button>
      </motion.form>

      {/* Blogs List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
      >
        {blogs.length === 0 ? (
          <p className="text-gray-400 text-center w-full">No blogs added yet.</p>
        ) : (
          blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800 p-5 rounded-2xl shadow-xl border border-gray-700 flex flex-col justify-between"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {blog.content.length > 100
                    ? blog.content.substring(0, 100) + "..."
                    : blog.content}
                </p>
              </div>
              <button
                onClick={() => handleDelete(blog.id)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg mt-auto text-sm self-end transition"
              >
                <FaTrash /> Delete
              </button>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Blogs;
