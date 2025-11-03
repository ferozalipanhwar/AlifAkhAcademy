import { useNavigate } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "How to use music in education",
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    author: "John Doe",
    date: "Oct 20, 2025",
    content: `
      Music in education enhances memory, creativity, and emotional balance.
      Integrating rhythm and melody in classrooms improves student focus and engagement.
      Studies show that learning through songs can strengthen cognitive development and teamwork.
      Teachers can use background music, songwriting exercises, and musical games to make learning fun.
    `,
  },
  {
    id: 2,
    title: "Education with technologies",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    author: "Jane Smith",
    date: "Nov 1, 2025",
    content: `
      Technology has revolutionized the education landscape.
      Smart classrooms, AI tutors, and online platforms allow students to learn at their own pace.
      Teachers now act as facilitators rather than lecturers, guiding students through interactive content.
      The future of education is blended — combining human touch with intelligent systems.
    `,
  },
  {
    id: 3,
    title: "Turning goals into reality",
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80",
    author: "Alex Johnson",
    date: "Sep 12, 2025",
    content: `
      Setting realistic goals is the first step toward success.
      Education teaches discipline, persistence, and problem-solving — the tools needed to achieve those goals.
      Visualization and consistent daily effort turn dreams into accomplishments.
      Stay motivated, stay curious, and success will follow.
    `,
  },
  {
    id: 4,
    title: "The nation into education",
    img: "https://images.unsplash.com/photo-1549893079-842e6e4e1a19?auto=format&fit=crop&w=600&q=80",
    author: "Emily Carter",
    date: "Aug 30, 2025",
    content: `
      Education builds nations.
      A literate and skilled population drives innovation, growth, and peace.
      Governments should prioritize access to quality education for all.
      Every child educated is a future leader in the making.
    `,
  },
];

const BlogSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          📝 <span className="text-green-600">Our Blog</span>
        </h2>

        {/* Blog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blog/${blog.id}`, { state: blog })}
              className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                  {blog.content.slice(0, 100)}...
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
