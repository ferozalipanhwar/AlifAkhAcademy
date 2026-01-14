import {
  Award,
  Clock,
  FileCheck,
  Headphones,
  Laptop,
  Users
} from "lucide-react";

const features = [
  {
    title: "Skill Assessment",
    description: "Test your knowledge with our adaptive quizzes and real-time coding challenges designed to track your progress.",
    icon: <FileCheck size={28} />,
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry experts and university professors who are passionate about teaching and mentoring.",
    icon: <Users size={28} />,
  },
  {
    title: "Recognized Certificates",
    description: "Earn certificates upon completion to showcase your skills on your resume and LinkedIn profile.",
    icon: <Award size={28} />,
  },
  {
    title: "Lifetime Access",
    description: "Buy a course once and get lifetime access to the content, including all future updates and resources.",
    icon: <Clock size={28} />,
  },
  {
    title: "Interactive Learning",
    description: "Engage with interactive video lessons, quizzes, and peer discussions to deepen your understanding.",
    icon: <Laptop size={28} />,
  },
  {
    title: "24/7 Support",
    description: "Get your questions answered anytime by our dedicated support team and active student community.",
    icon: <Headphones size={28} />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative bg-gray-50 py-20 px-6 md:px-12 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
            Unlock Your Potential with <span className="text-emerald-600">Premium Features</span>
          </h2>
          <p className="text-gray-500 text-lg">
            We provide everything you need to learn, grow, and succeed in your career.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Hover Line Top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

              {/* Icon */}
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;