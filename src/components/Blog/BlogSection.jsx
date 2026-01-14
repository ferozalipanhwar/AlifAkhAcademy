import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  FileText,
  Loader2,
  Tag,
  User
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../apiHelper/api";

const BlogSection = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blog");
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Blogs not found:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Format Date Helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
            Our Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
            Latest <span className="text-emerald-600">News & Insights</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Stay updated with the latest trends in education, technology, and career growth.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64 text-emerald-600">
            <Loader2 size={40} className="animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
               <FileText size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">No Articles Found</h3>
            <p className="text-gray-500 text-sm">Check back later for new updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/blog/${blog._id}`, { state: blog })}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={blog.img || "https://images.unsplash.com/photo-1499750310159-529800cf2c5a?auto=format&fit=crop&w=800&q=80"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm uppercase tracking-wide">
                      <Tag size={12} /> {blog.category || "General"}
                    </span>
                  </div>
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta Data */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-emerald-500" />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1.5">
                      <User size={14} className="text-emerald-500" />
                      {blog.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                    {blog.content}
                  </p>

                  {/* Footer Link */}
                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-emerald-600 text-sm font-semibold group-hover:underline decoration-emerald-600 underline-offset-4 flex items-center gap-1">
                      Read Article <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {blogs.length > 0 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-emerald-600 hover:border-emerald-200"
            >
              View All Posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;