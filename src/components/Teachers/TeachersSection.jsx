import { BookOpen, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import API from "../../apiHelper/api";

const TeachersSection = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teachers");
      setTeachers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Slider Settings for Mobile/Tablet
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: (i) => (
      <div className="w-2 h-2 bg-emerald-300 rounded-full mt-4 hover:bg-emerald-600 transition-colors"></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Reusable Teacher Card
  const TeacherCard = ({ teacher }) => (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
      {/* Card Header Gradient */}
      <div className="h-24 bg-gradient-to-r from-emerald-500 to-green-600 relative">
        <div className="absolute -bottom-10 inset-x-0 flex justify-center">
          <div className="p-1 bg-white rounded-full">
            <img
              src={teacher.img || "https://via.placeholder.com/150"}
              alt={teacher.fullname}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 pb-6 px-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{teacher.fullname}</h3>
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4">
          <BookOpen size={12} />
          {teacher.courseId?.title || "Expert Instructor"}
        </div>

        <p className="text-gray-500 text-sm mb-6 line-clamp-2">
          Passionate educator dedicated to helping students achieve their academic goals through innovative teaching methods.
        </p>

        {/* Social Icons (Hover Reveal) */}
        <div className="flex justify-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
          <SocialButton icon={<Linkedin size={18} />} />
          <SocialButton icon={<Twitter size={18} />} />
          <SocialButton icon={<Mail size={18} />} />
        </div>
      </div>
    </div>
  );

  return (
    <section id="Teachers" className="relative py-20 px-6 bg-gray-50 overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50 translate-x-1/2"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
            Our Faculty
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
            Meet Our <span className="text-emerald-600">Expert Instructors</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Learn from industry professionals and experienced mentors committed to your success.
          </p>
        </div>

        {/* Desktop Grid (Hidden on Mobile) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <TeacherCard key={index} teacher={teacher} />
          ))}
        </div>

        {/* Mobile/Tablet Slider */}
        <div className="md:hidden pb-10">
          <Slider {...sliderSettings}>
            {teachers.map((teacher, index) => (
              <div key={index} className="px-3 py-4">
                <TeacherCard teacher={teacher} />
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
};

// Helper for Social Buttons
const SocialButton = ({ icon }) => (
  <a 
    href="#" 
    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-300"
  >
    {icon}
  </a>
);

export default TeachersSection;