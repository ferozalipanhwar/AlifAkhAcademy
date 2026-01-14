import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Star,
  User,
  X
} from "lucide-react";
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

  // Fetch Courses
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses/");
      const transformed = res.data.data.map((course) => ({
        _id: course._id,
        image: course.img || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
        title: course.title,
        description: course.description,
        timing: course.duration,
        teacher: course.teacherId?.fullname || "Alif-Akh Faculty",
        details: course.description,
        rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1), // Fake rating for UI
        reviews: Math.floor(Math.random() * 200) + 50, // Fake reviews count
        level: "Beginner" // Placeholder level
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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    customPaging: (i) => (
      <div className="w-2 h-2 bg-emerald-200 rounded-full mt-4 hover:bg-emerald-600 transition-colors"></div>
    ),
  };

  const goToEnroll = (course) => {
    navigate("/course-register", {
      state: {
        courseId: course._id,
        courseTitle: course.title,
      },
    });
  };

  // Reusable Card Component
  const CourseCard = ({ course, onClick }) => (
    <div 
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-emerald-700 uppercase tracking-wide">
          {course.level}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
           <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
              <Star size={14} fill="currentColor" /> {course.rating} 
              <span className="text-gray-400 font-normal">({course.reviews})</span>
           </div>
           <span className="text-emerald-600 font-bold text-lg">Free</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
          {course.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-500">
          <div className="flex items-center gap-2">
             <User size={16} className="text-emerald-500" />
             <span className="truncate max-w-[100px]">{course.teacher}</span>
          </div>
          <div className="flex items-center gap-2">
             <Clock size={16} className="text-emerald-500" />
             <span>{course.timing}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="Courses" className="py-20 px-6 md:px-12 bg-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
            Top Class Learning
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
            Explore Our <span className="text-emerald-600">Popular Courses</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Discover courses taught by industry experts and take your skills to the next level.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} onClick={() => setSelectedCourse(course)} />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden pb-10">
          <Slider {...sliderSettings}>
            {courses.map((course) => (
              <div key={course._id} className="px-2 py-4 h-full">
                <CourseCard course={course} onClick={() => setSelectedCourse(course)} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white text-white hover:text-gray-800 p-2 rounded-full backdrop-blur-md transition-all"
              >
                <X size={20} />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-2/5 h-48 md:h-auto relative">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
                <div className="absolute bottom-4 left-4 text-white md:hidden">
                  <h3 className="text-xl font-bold">{selectedCourse.title}</h3>
                </div>
              </div>

              {/* Modal Details */}
              <div className="w-full md:w-3/5 p-8 flex flex-col overflow-y-auto">
                <h3 className="hidden md:block text-2xl font-bold text-gray-900 mb-2">
                  {selectedCourse.title}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                   <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                     <Clock size={14} /> {selectedCourse.timing}
                   </span>
                   <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded">
                     <User size={14} /> {selectedCourse.teacher}
                   </span>
                </div>

                <div className="prose prose-sm text-gray-600 mb-8 flex-1">
                   <p>{selectedCourse.details}</p>
                   <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>

                <div className="mt-auto space-y-3">
                  <button
                    onClick={() => goToEnroll(selectedCourse)}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all flex items-center justify-center gap-2"
                  >
                    Enroll Now <ArrowRight size={18} />
                  </button>
                  <button
                     onClick={() => setSelectedCourse(null)}
                     className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CoursesSection;