import {
  BookOpen,
  Briefcase,
  CheckCircle,
  Linkedin,
  Loader2,
  Send,
  User
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../apiHelper/api"; // ✅ Imported your API helper
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const TeacherRegistrationForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: user?.name || "",
    email: user?.email || "",
    qualification: "",
    experience: "",
    subject: "",
    portfolio: "",
    bio: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Sending data to backend
      const response = await API.post('/teachers/apply', formData);
      
      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Application failed:", error);
      // Optional: Show error message to user
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 pt-20 pb-12">
           <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center border border-emerald-100">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle size={40} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
              <p className="text-gray-500 mb-8">
                 Thank you for your interest in teaching at Alif-Akh Academy. Our team will review your application and contact you via email within 48 hours.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
              >
                Back to Home
              </button>
           </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6 font-sans">
        
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
             <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Instructor Application</h1>
             <p className="text-gray-500 mt-2">Tell us about yourself and what you'd like to teach.</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
             <div className="h-2 bg-emerald-600 w-full"></div> {/* Top Accent */}
             
             <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
                
                {/* Read-only User Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed">
                         <User size={18} /> {formData.fullname}
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed">
                         <Send size={18} /> {formData.email}
                      </div>
                   </div>
                </div>

                <div className="border-t border-gray-100 my-4"></div>

                {/* Professional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Qualification</label>
                      <input 
                        type="text" 
                        name="qualification"
                        required
                        placeholder="e.g. Masters in CS, PhD" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        onChange={handleChange}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Teaching Experience</label>
                      <select 
                        name="experience"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-white"
                        onChange={handleChange}
                      >
                         <option value="">Select Years</option>
                         <option value="0-1">0 - 1 Years</option>
                         <option value="1-3">1 - 3 Years</option>
                         <option value="3-5">3 - 5 Years</option>
                         <option value="5+">5+ Years</option>
                      </select>
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Subject Expertise</label>
                   <div className="relative">
                      <BookOpen className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <input 
                        type="text" 
                        name="subject"
                        required
                        placeholder="What do you want to teach? (e.g. Web Development, Math)" 
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        onChange={handleChange}
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn / Portfolio URL</label>
                   <div className="relative">
                      <Linkedin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <input 
                        type="url" 
                        name="portfolio"
                        placeholder="https://linkedin.com/in/..." 
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        onChange={handleChange}
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">About You (Bio)</label>
                   <textarea 
                      name="bio"
                      required
                      rows="4"
                      placeholder="Tell us about your teaching style and why you want to join..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                      onChange={handleChange}
                   ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <Briefcase size={20} />
                    </>
                  )}
                </button>

             </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeacherRegistrationForm;