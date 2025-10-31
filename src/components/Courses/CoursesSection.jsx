import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const courses = [
  {
    image: "https://images.unsplash.com/photo-1581091215365-64077c7b0f96?auto=format&fit=crop&w=800&q=80",
    title: "Web Development",
    description: "Learn HTML, CSS, JS, React and build real projects.",
    timing: "3 Months",
    teacher: "John Doe",
  },
  {
    image: "https://images.unsplash.com/photo-1581091012184-197af7a9889e?auto=format&fit=crop&w=800&q=80",
    title: "Data Science",
    description: "Master Python, Pandas, Machine Learning & AI concepts.",
    timing: "4 Months",
    teacher: "Jane Smith",
  },
  {
    image: "https://images.unsplash.com/photo-1581090700223-45b30c4a7f8a?auto=format&fit=crop&w=800&q=80",
    title: "UI/UX Design",
    description: "Design stunning interfaces and improve user experience.",
    timing: "2 Months",
    teacher: "Alice Johnson",
  },
];

const CoursesSection = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // hide arrows for mobile
    adaptiveHeight: true,
  };

  return (
    <section id="Courses" className="py-12 px-6 md:px-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
        Our Courses
      </h2>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-2xl shadow-lg overflow-hidden bg-gray-50"
          >
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover"/>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 flex-1">{course.description}</p>
              <div className="mt-4 flex justify-between items-center text-gray-700 text-sm">
                <span>{course.timing}</span>
                <span>{course.teacher}</span>
              </div>
              <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Slider */}
      <div className="md:hidden">
        <Slider {...sliderSettings}>
          {courses.map((course, idx) => (
            <div key={idx} className="px-4">
              <div className="flex flex-col rounded-2xl shadow-lg overflow-hidden bg-gray-50">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover"/>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 flex-1">{course.description}</p>
                  <div className="mt-4 flex justify-between items-center text-gray-700 text-sm">
                    <span>{course.timing}</span>
                    <span>{course.teacher}</span>
                  </div>
                  <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* View All Link */}
      <div className="text-center mt-10">
        <a href="#"
           className="text-green-600 font-medium hover:underline">
          View All Courses
        </a>
      </div>
    </section>
  );
};

export default CoursesSection;
