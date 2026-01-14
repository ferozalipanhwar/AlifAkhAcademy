import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Globe,
  GraduationCap,
  Home,
  Laptop,
  Users
} from "lucide-react";

const programs = [
  {
    id: 1,
    title: "Pre-College Education",
    description: "Broaden the creative horizons of your children with foundational courses designed for early learners.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    icon: <BookOpen size={20} />,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    title: "Middle School",
    description: "Comprehensive curriculum focusing on core subjects to build a strong academic base.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    icon: <Users size={20} />,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    id: 3,
    title: "High School",
    description: "Preparing youngsters for adult life and university with advanced specialized tracks.",
    image: "https://images.unsplash.com/photo-1427504746696-ea5abd7dfe83?auto=format&fit=crop&w=800&q=80",
    icon: <Laptop size={20} />,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: 4,
    title: "International Exchange",
    description: "Accepting students from abroad and offering cultural exchange programs.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    icon: <Globe size={20} />,
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: 5,
    title: "Graduate Programs",
    description: "Solidifying knowledge obtained through years of learning with master's level research.",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=800&q=80",
    icon: <GraduationCap size={20} />,
    color: "bg-red-100 text-red-600"
  },
  {
    id: 6,
    title: "Home Education",
    description: "Providing robust distance education and homeschooling resources for flexible learning.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    icon: <Home size={20} />,
    color: "bg-teal-100 text-teal-600"
  },
];

const ProgramSection = () => {
  return (
    <section id="Programs" className="py-20 bg-white relative overflow-hidden">
      
      {/* Background Dots */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[url('https://www.transparenttextures.com/patterns/dots.png')] opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[url('https://www.transparenttextures.com/patterns/dots.png')] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
            Our Curriculum
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
            Educational <span className="text-emerald-600">Programs</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            We offer a wide range of programs designed to cater to students at every stage of their academic journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                
                {/* Icon Badge */}
                <div className={`absolute bottom-4 left-4 p-2.5 rounded-xl ${program.color} shadow-lg backdrop-blur-sm bg-opacity-90`}>
                   {program.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                  {program.description}
                </p>
                
                {/* Link */}
                <div className="flex items-center text-emerald-600 font-semibold text-sm group/link cursor-pointer">
                   <span>View Details</span>
                   <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;