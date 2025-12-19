import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../apiHelper/api"; // Axios instance

const BlogSection = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blog"); // ✅ use Axios instance
      console.log("Fetched blogs:", res.data);
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Blogs not found:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          📝 <span className="text-green-600">Our Blog</span>
        </h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.isArray(blogs) &&
            blogs.map((blog) => (
              <div
                key={blog._id} // use blog._id directly
                onClick={() => navigate(`/blog/${blog._id}`, { state: blog })}
                className="bg-white border rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {blog.category} • {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.content.slice(0, 120)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm italic">
                      By {blog.author}
                    </span>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
