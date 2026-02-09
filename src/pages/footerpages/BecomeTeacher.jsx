import { ArrowRight, Globe, Users, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const BecomeTeacher = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  const handleStartTeaching = () => {
    if (user) {
      // Agar login hai to Teacher Form par bhejo
      navigate("/teacher-register");
    } else {
      // Agar login nahi hai to Register par bhejo
      navigate("/register");
    }
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 font-sans">
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Teach on <span className="text-emerald-600">Alif-Akh Academy</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Share your knowledge, inspire students, and earn money by creating world-class courses. Join our community of expert educators today.
          </p>
          
          <button 
            onClick={handleStartTeaching}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Start Teaching Today <ArrowRight size={20} />
          </button>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={<Globe size={32} />} 
            title="Reach a Global Audience" 
            desc="Publish your course and connect with students from all over the world." 
          />
          <FeatureCard 
            icon={<Wallet size={32} />} 
            title="Earn Revenue" 
            desc="Get paid for every student who enrolls in your course. Competitive revenue share." 
          />
          <FeatureCard 
            icon={<Users size={32} />} 
            title="Join a Community" 
            desc="Get support from our team and network with other talented instructors." 
          />
        </div>

        {/* Steps Section */}
        <div className="bg-white py-16 border-y border-gray-100">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How it works</h2>
            <div className="space-y-8">
              <Step number="1" title="Register / Apply" desc="Create an account and submit your instructor application." />
              <Step number="2" title="Plan Your Course" desc="Use our curriculum tools to structure your content effectively." />
              <Step number="3" title="Record Your Video" desc="Film your lectures. You can use a smartphone or a DSLR." />
              <Step number="4" title="Launch & Earn" desc="Upload your videos, set a price, and publish to students." />
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-emerald-900 text-white py-20 text-center mt-12 relative overflow-hidden">
          {/* Abstract pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to share your expertise?</h2>
            <button 
                onClick={handleStartTeaching}
                className="inline-block bg-white text-emerald-900 font-bold py-3 px-10 rounded-full hover:bg-gray-100 transition-colors mt-4 shadow-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>

      </div>
      <Footer/>
    </>
  );
};

// Helper Components remain same
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="flex gap-6 items-start p-4 rounded-xl hover:bg-gray-50 transition-colors">
    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500">{desc}</p>
    </div>
  </div>
);

export default BecomeTeacher;