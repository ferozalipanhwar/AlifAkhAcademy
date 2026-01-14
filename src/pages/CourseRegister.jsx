import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Mail,
  MessageSquare,
  Phone,
  User
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../apiHelper/api";
import AlertBox from "../components/UniversalComponents/AlertBox";

const CourseRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure with default values to prevent crashes
  const { courseId, courseTitle } = location.state || {};

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [alertData, setAlertData] = useState(null);

  // 1. Read user from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData((prev) => ({
        ...prev,
        fullname: parsedUser.name || parsedUser.fullname, // Handle potential key differences
        email: parsedUser.email,
      }));
    }
  }, []);

  // 2. Redirect if accessed without a course
  useEffect(() => {
    if (!courseId) {
      // Optional: Add a toast here before redirecting
      navigate("/");
    }
  }, [courseId, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post(
        "/course-enrollment/enroll",
        {
          courseId,
          fullname: formData.fullname,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: formData.message,
        },
        {
          headers: {
            Authorization: user ? `Bearer ${user.token}` : "",
          },
        }
      );

      setAlertData({
        message: "Enrollment Successful! Redirecting...",
        type: "success",
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setAlertData({
        message: error.response?.data?.message || "Enrollment failed. Please try again.",
        type: "error",
      });
      setLoading(false);
    }
  };

  // Reusable Input Styles
  const inputClass = "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400";
  const iconClass = "absolute left-3 top-3.5 text-gray-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-4">
      
      {/* Alert Overlay */}
      {alertData && (
        <div className="fixed top-5 right-5 z-50">
          <AlertBox {...alertData} onClose={() => setAlertData(null)} />
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        {/* Header Section */}
        <div className="bg-emerald-600 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-y-6 origin-top-left"></div>
          <h2 className="text-3xl font-bold text-white relative z-10">Secure Your Spot</h2>
          <p className="text-emerald-100 mt-2 relative z-10">Complete the form below to enroll instantly.</p>
        </div>

        <div className="p-8 md:p-10">
          
          {/* Selected Course Card */}
          <div className="mb-8 bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex items-start gap-4">
            <div className="p-3 bg-white rounded-lg text-emerald-600 shadow-sm">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Selected Course</p>
              <h3 className="text-lg font-bold text-gray-800 leading-tight">
                {courseTitle || "Unknown Course"}
              </h3>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* User Details Section */}
            {!user ? (
              <div className="grid md:grid-cols-2 gap-5">
                <div className="relative">
                  <User size={18} className={iconClass} />
                  <input
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <Mail size={18} className={iconClass} />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            ) : (
              // Logged In State Display
              <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg mb-6">
                 <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl">
                    {user.fullname?.charAt(0) || "U"}
                 </div>
                 <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium">Continuing as</p>
                    <p className="text-gray-900 font-bold">{user.fullname}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                 </div>
                 <CheckCircle className="text-emerald-500" size={20} />
              </div>
            )}

            {/* Contact Details */}
            <div className="relative">
              <Phone size={18} className={iconClass} />
              <input
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number (e.g. +1 234 567 890)"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Message Area */}
            <div className="relative">
              <MessageSquare size={18} className={iconClass} />
              <textarea
                name="message"
                placeholder="Any specific questions or requirements? (Optional)"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col md:flex-row gap-4">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="w-full md:w-1/3 py-3.5 px-6 rounded-lg border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-2/3 bg-emerald-600 text-white py-3.5 rounded-lg font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">Processing...</span>
                ) : (
                  <>
                    Confirm Enrollment <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              By clicking confirm, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseRegister;