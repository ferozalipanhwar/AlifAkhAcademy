import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50">
        <h2 className="text-2x2 font-semibold text-gray-800 mb-4">
          Blog not found 😕
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 to-white flex justify-center items-center py-10 px-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white shadow-2xl rounded-2x2 overflow-hidden max-w-4xl w-full">
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-72 object-cover"
        />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-green-700">
            {blog.title}
          </h1>
          <div className="flex items-center justify-between text-gray-500 text-sm mb-6">
            <p>👤 {blog.author}</p>
            <p>📅 {blog.date}</p>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </p>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              ← Back to Blogs
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
