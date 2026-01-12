import { useEffect, useState } from "react";
import API from "../../apiHelper/api";

const TeachersSection = () => {
  const [current, setCurrent] = useState(0);
  const [teachers,setTeachers]=useState([]);

 const fetchTeachers=async()=>{
  try {
  const res = await API.get("/teachers");
  console.log("Teachers API response:", res.data, typeof res.data);
  setTeachers(Array.isArray(res.data) ? res.data : []);
} catch (error) {
  console.error("Error fetching teachers:", error);
}

  
 }
 useEffect(()=>{
  fetchTeachers();
 },[])


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
              alt={teacher.fullname}
              className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-emerald-500"
            />
            <h3 className="text-lg font-semibold text-gray-800">{teacher.fullname}</h3>
            <p className="text-emerald-600 text-sm font-medium">{teacher.courseId?.title}</p>
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
                <h3 className="text-lg font-semibold text-gray-800">{teacher.fullname}</h3>
                <p className="text-emerald-600 text-sm font-medium">{teacher.courseId?.title}</p>
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

export default TeachersSection;
