import { motion } from "framer-motion";
import { ArrowRight, Award, CheckCircle } from "lucide-react";

const AboutUs = () => {
  return (
    <section id="AboutUs" className="relative py-20 bg-white overflow-hidden">
      
      {/* Background Patterns */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* ================= LEFT: CONTENT ================= */}
          <div className="flex-1 text-left">
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Who We Are
            </span>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-6 mb-6 leading-tight">
              Bridging the Gap Between <br/>
              <span className="text-emerald-600">Knowledge & Opportunity</span>
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Welcome to <span className="font-bold text-gray-800">Alif-Akh Academy</span>. We are more than just a learning platform; we are a community dedicated to empowering individuals. Our mission is to provide accessible, high-quality education that prepares you for the real world.
            </p>

            {/* Feature List */}
            <div className="space-y-3 mb-8">
              <FeatureItem text="Industry-expert mentors and instructors" />
              <FeatureItem text="Hands-on projects and practical learning" />
              <FeatureItem text="Lifetime access to course materials" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-100 pt-8 mb-8">
              <StatItem value="5k+" label="Students" />
              <StatItem value="50+" label="Courses" />
              <StatItem value="4.8" label="Rating" />
            </div>

            <a
              href="#Courses"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white transition-all duration-200 bg-emerald-600 rounded-full hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 group"
            >
              Start Learning <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </a>
          </div>

          {/* ================= RIGHT: IMAGE Composition ================= */}
          <div className="flex-1 relative w-full flex justify-center lg:justify-end">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white w-full max-w-lg">
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80"
                alt="Team Meeting"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Floating Experience Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -left-4 md:bottom-10 md:-left-10 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 max-w-xs animate-float"
            >
              <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                <Award size={28} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">10+</p>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Years of Excellence</p>
              </div>
            </motion.div>

            {/* Decorative Dots */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/dots.png')] opacity-20 -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Helper Components
const FeatureItem = ({ text }) => (
  <div className="flex items-center gap-3">
    <CheckCircle size={20} className="text-emerald-500 shrink-0" />
    <span className="text-gray-700 font-medium">{text}</span>
  </div>
);

const StatItem = ({ value, label }) => (
  <div>
    <h4 className="text-3xl font-bold text-gray-900">{value}</h4>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
  </div>
);

export default AboutUs;