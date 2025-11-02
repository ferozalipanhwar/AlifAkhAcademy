import { useState } from "react";

const teachers = [
  { name: "Velvet Vachon", role: "Design Head", img: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Arlene Anello", role: "SEO Head", img: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Benton Colley", role: "Photography Head", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Floyd Fukuda", role: "Marketing HOD", img: "https://randomuser.me/api/portraits/men/2.jpg" },
  { name: "Elena Cully", role: "Design Head", img: "https://randomuser.me/api/portraits/women/3.jpg" },
  { name: "Burton Brooke", role: "Web Technologist", img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Ressie Rottman", role: "Design Head", img: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "Reed Recio", role: "Photography Head", img: "https://randomuser.me/api/portraits/men/4.jpg" },
  { name: "Nancee Bluford", role: "SEO Head", img: "https://randomuser.me/api/portraits/women/5.jpg" },
];

const TeachersSlider = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section id="Teachers" className="bg-gray-50 py-12 px-6 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-10">Our Teachers</h2>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {teachers.map((teacher, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={teacher.img}
              alt={teacher.name}
              className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-emerald-500"
            />
            <h3 className="text-lg font-semibold text-gray-800">{teacher.name}</h3>
            <p className="text-emerald-600 text-sm font-medium">{teacher.role}</p>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="sm:hidden relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {teachers.map((teacher, index) => (
            <div key={index} className="flex-none w-full px-6">
              <div className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-md">
                <img
                  src={teacher.img}
                  alt={teacher.name}
                  className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-emerald-500"
                />
                <h3 className="text-lg font-semibold text-gray-800">{teacher.name}</h3>
                <p className="text-emerald-600 text-sm font-medium">{teacher.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-3">
          {teachers.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full border border-emerald-300 cursor-pointer ${
                current === index ? "bg-emerald-600" : "bg-transparent"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachersSlider;
