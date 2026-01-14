import { motion } from "framer-motion";
import {
  Calendar,
  ImagePlus,
  Loader2,
  PenTool,
  Search,
  Tag,
  Trash2,
  User
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../apiHelper/api"; // Axios instance

const BlogManager = () => {
  const token = localStorage.getItem("authToken");

  const [blogs, setBlogs] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    image: "",
  });

  // 🚀 Load Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blog");
        setBlogs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // 📤 Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileInput(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog({ ...newBlog, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ➕ Add Blog
  const handleAddBlog = async () => {
    if (!newBlog.title || !newBlog.content || !newBlog.author || !newBlog.category || !fileInput) {
      return alert("⚠️ Please fill all fields & upload an image!");
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    formData.append("author", newBlog.author);
    formData.append("category", newBlog.category);
    formData.append("img", fileInput);

    try {
      const res = await API.post("/blog/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Blog added successfully!");
      setBlogs([...blogs, res.data]);
      setNewBlog({ title: "", content: "", author: "", category: "", image: "" });
      setFileInput(null);
    } catch (err) {
      console.error("Error adding blog:", err);
      alert("❌ Error adding blog");
    } finally {
      setSubmitting(false);
    }
  };

  // 🗑 Delete Blog
  const handleDeleteBlog = async (id) => {
    if(!window.confirm("Are you sure you want to delete this blog?")) return;
    
    try {
      await API.delete(`/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("❌ Error deleting blog");
    }
  };

  return (
    <div className="space-y-8 p-2">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Management</h1>
          <p className="text-gray-400 text-sm mt-1">Create and manage your academy's articles.</p>
        </div>
        <div className="hidden md:flex items-center bg-[#1a1d21] border border-gray-700 rounded-lg px-3 py-1.5 w-64">
           <Search size={16} className="text-gray-500 mr-2" />
           <input type="text" placeholder="Search blogs..." className="bg-transparent border-none outline-none text-sm text-gray-300 w-full" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Create Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-[#1a1d21] border border-white/5 p-6 rounded-2xl sticky top-24 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <PenTool size={18} className="text-emerald-500" /> Create New Post
            </h2>

            <div className="space-y-4">
              {/* Image Upload Area */}
              <div className="relative group">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer bg-[#0f1115] hover:bg-gray-800 hover:border-emerald-500/50 transition-all overflow-hidden">
                  {newBlog.image ? (
                    <img src={newBlog.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                      <ImagePlus size={32} className="mb-2 text-gray-500 group-hover:text-emerald-500 transition-colors" />
                      <p className="text-xs">Click to upload cover image</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              {/* Inputs */}
              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Title</label>
                <input
                  type="text"
                  placeholder="Enter blog title"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium ml-1">Content</label>
                <textarea
                  placeholder="Write your content here..."
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  rows="6"
                  className="w-full mt-1 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors text-sm resize-none custom-scrollbar"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                   <label className="text-xs text-gray-500 font-medium ml-1">Author</label>
                   <div className="relative mt-1">
                     <User size={14} className="absolute left-3 top-3.5 text-gray-500" />
                     <input
                      type="text"
                      placeholder="Name"
                      value={newBlog.author}
                      onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                      className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                    />
                   </div>
                </div>
                <div>
                   <label className="text-xs text-gray-500 font-medium ml-1">Category</label>
                   <div className="relative mt-1">
                     <Tag size={14} className="absolute left-3 top-3.5 text-gray-500" />
                     <input
                      type="text"
                      placeholder="Tech, etc"
                      value={newBlog.category}
                      onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                      className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                    />
                   </div>
                </div>
              </div>

              <button
                onClick={handleAddBlog}
                disabled={submitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {submitting ? <Loader2 className="animate-spin" size={20} /> : "Publish Post"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Blog Grid */}
        <div className="lg:col-span-2">
          {loading ? (
             <div className="flex justify-center items-center h-64 text-emerald-500">
               <Loader2 size={40} className="animate-spin" />
             </div>
          ) : blogs.length === 0 ? (
            <div className="bg-[#1a1d21] border border-white/5 rounded-2xl p-10 text-center">
               <p className="text-gray-400">No blogs found. Create your first post!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1a1d21] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.img}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/10">
                      {blog.category}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-1">
                      {blog.content}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-gray-500">
                       <div className="flex items-center gap-3">
                         <span className="flex items-center gap-1"><User size={12}/> {blog.author}</span>
                         <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(blog.createdAt).toLocaleDateString()}</span>
                       </div>
                       
                       <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1.5 rounded-md transition-all"
                        title="Delete Blog"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManager;