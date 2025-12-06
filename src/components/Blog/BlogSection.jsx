import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const api="http://localhost:5000/api/blog";



const BlogSection = () => {
  const navigate = useNavigate();
  const [blogs,setBlogs]=useState([]);
  
  const fetchBlogs=async()=>{
    try {
      const res=await axios.get(`${api}/`)
      setBlogs(res.data);
   
      
     
      
    } catch (error) {
      console.log('blogs not founded',error);
      
      
    }
  }
  useEffect(()=>{
    fetchBlogs();
  },[])

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          📝 <span className="text-green-600">Our Blog</span>
        </h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id.$oid}
              onClick={() => navigate(`/blog/${blog._id.$oid}`, { state: blog })}
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
                  {blog.category} • {blog.createdAt}
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
