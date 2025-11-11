import { motion } from "framer-motion";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "The Future of Web Development in 2025",
      author: "Feroz Ali Panhwar",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      createdAt: "2025-11-06T10:00:00Z",
      content:
        "With the rapid evolution of frameworks and AI-assisted coding, web development in 2025 is becoming faster and more dynamic. Developers now rely on automation and smart deployment tools to build applications efficiently.",    
    },
    {
      id: 2,
      title: "Top 10 React Tips for Modern Developers", 
      author: "Sara Khan",
      category: "React JS",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
      createdAt: "2025-10-30T12:30:00Z",
      content:
        "React continues to dominate frontend development. Here are 10 practical tips for writing cleaner, more efficient React code in 2025.",    
    },
    {
      id: 3,
      title: "Understanding Voice-Enabled E-Commerce",
      author: "Ali Raza",
      category: "E-Commerce",
      image:
        "https://images.unsplash.com/photo-1584697964180-7b43878e84e0?auto=format&fit=crop&w=800&q=80",
      createdAt: "2025-09-15T09:00:00Z",
      content:
        "As voice search becomes more prevalent, e-commerce businesses must adapt their strategies. This blog explores the impact of voice technology on online shopping.", 
    },   
  ]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    image: "",
  });

  // ✅ Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewBlog({ ...newBlog, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // ✅ Add Blog
  const handleAddBlog = () => {
    if (
      !newBlog.title ||
      !newBlog.content ||
      !newBlog.image ||
      !newBlog.author ||
      !newBlog.category
    ) {
      return alert("⚠️ Please fill in all fields and upload an image!");
    }

    const newEntry = {
      id: Date.now(),
      ...newBlog,
      createdAt: new Date().toISOString(),
    };

    setBlogs([...blogs, newEntry]);
    setNewBlog({
      title: "",
      content: "",
      author: "",
      category: "",
      image: "",
    });
  };

  // ✅ Delete Blog
  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-indigo-400">
        📝 Blog Manager
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
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            rows="4"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-400 outline-none"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Author Name"
              value={newBlog.author}
              onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
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
          <p className="text-center text-gray-400">No blogs added yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-indigo-500/30 transition"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-indigo-400 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="font-semibold text-gray-300">
                      Author:
                    </span>{" "}
                    {blog.author}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="font-semibold text-gray-300">
                      Category:
                    </span>{" "}
                    {blog.category}
                  </p>
                  <p className="text-sm text-gray-400 mb-3">
                    {blog.content.substring(0, 80)}...
                  </p>
                  <p className="text-xs text-gray-500">
                    🕒 {new Date(blog.createdAt).toLocaleString()}
                  </p>

                  <button
                    onClick={() => handleDeleteBlog(blog.id)}
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
