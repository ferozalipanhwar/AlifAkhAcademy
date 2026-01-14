import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Share2,
  Tag,
  User
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  // 404 State - Modernized
  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 text-2xl">
            😕
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
          <p className="text-gray-500 mb-6">
            The article you are looking for might have been removed or is temporarily unavailable.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white pb-20"
    >
      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        {/* Background Image */}
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Navigation Bar (Floating) */}
        <div className="absolute top-6 left-0 right-0 px-6 max-w-7xl mx-auto flex justify-between items-center z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex gap-3">
             <button className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-emerald-600 transition-all duration-300">
                <Bookmark size={20} />
             </button>
             <button className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-500 transition-all duration-300">
                <Share2 size={20} />
             </button>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 max-w-4xl mx-auto">
           <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
           >
             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wide mb-4">
               <Tag size={12} /> {blog.category || "Education"}
             </span>
             <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 text-shadow-lg">
               {blog.title}
             </h1>
             
             {/* Mobile Author Info */}
             <div className="flex items-center gap-4 text-white/90 text-sm md:hidden">
               <span>{blog.author}</span>
               <span>•</span>
               <span>{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</span>
             </div>
           </motion.div>
        </div>
      </div>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          
          {/* Metadata Row (Desktop) */}
          <div className="hidden md:flex items-center justify-between border-b border-gray-100 pb-8 mb-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 border border-gray-200">
                 <User size={24} />
               </div>
               <div>
                 <p className="font-bold text-gray-900">{blog.author}</p>
                 <p className="text-sm text-emerald-600 font-medium">Author</p>
               </div>
            </div>

            <div className="flex items-center gap-6 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-400" />
                {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-400" />
                5 min read
              </div>
            </div>
          </div>

          {/* Article Body */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed"
          >
            {/* Note: Using whitespace-pre-wrap to preserve paragraphs if the content comes as a raw string.
              In a real app, you might use a markdown parser here.
            */}
            <div className="whitespace-pre-wrap font-serif md:font-sans text-lg">
              {blog.content}
            </div>
          </motion.div>

          {/* Tags Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Related Topics</h4>
            <div className="flex flex-wrap gap-2">
              {["Education", "Learning", "Development", "Career"].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

    </motion.div>
  );
};

export default BlogDetail;