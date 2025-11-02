import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const courses = [
  {
    image:
      "https://images.unsplash.com/photo-1581091215365-64077c7b0f96?auto=format&fit=crop&w=800&q=80",
    title: "Web Development",
    description:
      "Learn HTML, CSS, JavaScript, and React to build real-world websites.",
    timing: "3 Months",
    teacher: "John Doe",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581091012184-197af7a9889e?auto=format&fit=crop&w=800&q=80",
    title: "Data Science",
    description:
      "Master Python, Pandas, and Machine Learning with practical projects.",
    timing: "4 Months",
    teacher: "Jane Smith",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581090700223-45b30c4a7f8a?auto=format&fit=crop&w=800&q=80",
    title: "UI/UX Design",
    description:
      "Design beautiful, user-friendly interfaces and improve user experience.",
    timing: "2 Months",
    teacher: "Alice Johnson",
  },
];

const CoursesSection = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true, // important for mobile
  };

  return (
    <section
      id="Courses"
      className="py-16 px-6 md:px-20 bg-gradient-to-br from-green-50 to-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Our <span className="text-green-600">Courses</span>
      </h2>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-3 gap-10">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {course.description}
                </p>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-4">
                <span>⏳ {course.timing}</span>
                <span>👨‍🏫 {course.teacher}</span>
              </div>
              <button className="w-full bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Slider */}
      <div className="md:hidden block">
        <Slider {...sliderSettings}>
          {courses.map((course, idx) => (
            <div key={idx} className="px-4 py-4">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-gray-700 text-sm mb-4">
                    <span>⏳ {course.timing}</span>
                    <span>👨‍🏫 {course.teacher}</span>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* View All Link */}
      <div className="text-center mt-12">
        <a
          href="#"
          className="text-green-600 font-medium hover:underline text-lg"
        >
          View All Courses →
        </a>
      </div>
    </section>
  );
};

export default CoursesSection;
