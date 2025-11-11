import { useNavigate } from "react-router-dom";

const blogs = [
  {
    _id: { $oid: "690cd74f4180c1c83002cd98" },
    title: "The Future of Web Development in 2025",
    author: "Feroz Ali Panhwar",
    category: "Web Development",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    createdAt: "Nov 6, 2025",
    content: `
      With the rapid evolution of frameworks and AI-assisted coding, web development in 2025 
      is becoming faster and more dynamic. Developers now rely on automation and smart deployment 
      tools to build applications efficiently.
    `,
  },
  {
    _id: { $oid: "690cd74f4180c1c83002cd99" },
    title: "Top 10 React Tips for Modern Developers",
    author: "Sara Khan",
    category: "React JS",
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    createdAt: "Oct 30, 2025",
    content: `
      React continues to dominate frontend development. Here are 10 practical tips for writing 
      cleaner, more efficient React code in 2025.
    `,
  },
  {
    _id: { $oid: "690cd74f4180c1c83002cd9a" },
    title: "Understanding Voice-Enabled E-Commerce",
    author: "Feroz Ali Panhwar",
    category: "AI & E-Commerce",
    img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    createdAt: "Sep 15, 2025",
    content: `
      Voice-enabled shopping is revolutionizing how users interact with online stores. 
      Integrating AI assistants like Alan AI and Google Voice APIs can significantly 
      improve accessibility and convenience.
    `,
  },
];

const BlogSection = () => {
  const navigate = useNavigate();

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
