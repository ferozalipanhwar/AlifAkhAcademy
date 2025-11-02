
const blogs = [
  {
    id: 1,
    title: "How to use music in education",
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Education with technologies",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Turning goals into reality",
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "The nation into education",
    img: "https://images.unsplash.com/photo-1549893079-842e6e4e1a19?auto=format&fit=crop&w=600&q=80",
  },
];

const BlogSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Blog</h2>

        {/* Blog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm">
                  Read more
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
