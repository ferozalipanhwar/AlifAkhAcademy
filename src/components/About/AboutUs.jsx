const AboutUs = () => {
  return (
    <section
      id="AboutUs"
      className="py-16 px-6 md:px-20 bg-gradient-to-b from-white to-green-50 flex flex-col md:flex-row items-center gap-12"
    >
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          About <span className="text-green-600">Us</span>
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg">
          Welcome to <span className="font-semibold text-gray-800">EduVerse</span> — 
          your trusted destination for professional learning. We are dedicated 
          to empowering students through high-quality education, interactive courses, 
          and expert guidance from experienced mentors. Our goal is to help learners 
          achieve their dreams by bridging the gap between knowledge and opportunity.
        </p>
        <p className="text-gray-600 leading-relaxed mb-8 text-base md:text-lg">
          Whether you’re starting your career or enhancing your skills, 
          our tailored programs in web development, data science, and design 
          are designed to fit your learning style and schedule.
        </p>

        <a
          href="#Courses"
          className="inline-block bg-green-600 text-white py-3 px-8 rounded-xl font-medium hover:bg-green-700 transition"
        >
          Explore Courses
        </a>
      </div>

      {/* Right Image */}
      <div className="flex-1 flex justify-center md:justify-end">
        <img
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80"
          alt="About Us"
          className="w-full max-w-md rounded-2x2 shadow-xl transform hover:scale-105 transition duration-500"
        />
      </div>
    </section>
  );
};

export default AboutUs;
