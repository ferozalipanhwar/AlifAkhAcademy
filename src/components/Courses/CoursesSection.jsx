import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import API from "../../apiHelper/api.js";

const CoursesSection = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses/");
      const transformed = res.data.data.map((course) => ({
        _id: course._id,
        image: course.img || "https://via.placeholder.com/800x400",
        title: course.title,
        description: course.description,
        timing: course.duration,
        teacher: course.teacherId?.fullname || "N/A",
        details: course.description,
      }));
      setCourses(transformed);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  const goToEnroll = (course) => {
    navigate("/course-register", {
      state: {
        courseId: course._id,
        courseTitle: course.title,
      },
    });
  };

  return (
    <section
      id="Courses"
      className="py-16 px-6 md:px-20 bg-gradient-to-br from-green-50 to-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Our <span className="text-green-600">Courses</span>
      </h2>

      <div className="hidden md:grid md:grid-cols-3 gap-10">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
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
                <p className="text-gray-600 text-sm mb-4">
                  {course.description}
                </p>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span>⏳ {course.timing}</span>
                <span>👨‍🏫 {course.teacher}</span>
              </div>
              <button
                onClick={() => setSelectedCourse(course)}
                className="w-full bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden block">
        <Slider {...sliderSettings}>
          {courses.map((course) => (
            <div key={course._id} className="px-4 py-4">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span>⏳ {course.timing}</span>
                    <span>👨‍🏫 {course.teacher}</span>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-3 right-3 text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedCourse.image}
              alt={selectedCourse.title}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">
              {selectedCourse.title}
            </h3>
            <p className="mb-4">{selectedCourse.details}</p>
            <div className="flex justify-between mb-4">
              <span>⏳ {selectedCourse.timing}</span>
              <span>👨‍🏫 {selectedCourse.teacher}</span>
            </div>
            <button
              onClick={() => goToEnroll(selectedCourse)}
              className="w-full bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoursesSection;
