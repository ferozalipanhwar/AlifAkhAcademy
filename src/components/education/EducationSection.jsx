import { BookOpen, GraduationCap, MessageSquare, Users } from "lucide-react";

const EducationSection = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Optional Background Decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-50 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* ================= LEFT SIDE: IMAGE ================= */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Students collaborating"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce-slow">
              <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">10k+</p>
                <p className="text-xs text-gray-500 font-medium">Active Students</p>
              </div>
            </div>

            {/* Decorative Dot Grid */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/dots.png')] opacity-20 -z-10"></div>
          </div>

          {/* ================= RIGHT SIDE: CONTENT ================= */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold tracking-wide uppercase mb-4">
              Our Mission
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Reimagining Education for the <span className="text-emerald-600">Digital Age</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We provide cutting-edge courses designed to help you master new skills and achieve your career goals. Join a community of learners and experts dedicated to growth.
            </p>

            {/* Features List */}
            <div className="space-y-6">
              <FeatureItem 
                icon={<BookOpen size={24} />} 
                title="Learn Anything" 
                desc="Access thousands of topics from coding to creative arts."
              />
              <FeatureItem 
                icon={<GraduationCap size={24} />} 
                title="Expert Instructors" 
                desc="Learn directly from industry professionals and mentors."
              />
              <FeatureItem 
                icon={<MessageSquare size={24} />} 
                title="Community Support" 
                desc="Engage in discussions and grow your network."
              />
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <a 
                href="/courses" 
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all duration-200 bg-emerald-600 rounded-full hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200"
              >
                Start Learning Now
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Helper Component for List Items
const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gray-100">
    <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default EducationSection;